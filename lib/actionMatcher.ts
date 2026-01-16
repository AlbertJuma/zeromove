import actionsData from '@/data/actions.json';

export interface Action {
  id: number;
  title: string;
  description: string;
  category: 'immediate' | 'short_term' | 'skill_building';
  time_required: number;
  requires_internet: boolean;
  requires_phone: boolean;
  requires_computer: boolean;
  tags: string[];
}

export interface UserAnswers {
  housing: string;
  resources: string[];
  timeAvailable: number;
  priority: string;
  energy: string;
}

export interface MatchedActions {
  today: Action;
  thisWeek: Action;
  skillToBuild: Action;
}

/**
 * Match user answers to appropriate actions
 */
export function matchActions(answers: UserAnswers): MatchedActions {
  const allActions = actionsData.actions as Action[];

  // Filter actions based on user's resources
  const availableActions = allActions.filter((action) => {
    // Check time constraint
    if (answers.timeAvailable < action.time_required) {
      return false;
    }

    // Check resource requirements
    if (action.requires_internet && !answers.resources.includes('internet')) {
      return false;
    }
    if (action.requires_phone && !answers.resources.includes('phone')) {
      return false;
    }
    if (action.requires_computer && !answers.resources.includes('computer')) {
      return false;
    }

    return true;
  });

  // Filter by category
  const immediateActions = availableActions.filter(
    (a) => a.category === 'immediate'
  );
  const shortTermActions = availableActions.filter(
    (a) => a.category === 'short_term'
  );
  const skillBuildingActions = availableActions.filter(
    (a) => a.category === 'skill_building'
  );

  // Score actions based on priority and energy
  const scoreAction = (action: Action): number => {
    let score = 0;

    // Priority matching
    if (answers.priority === 'immediate_help' && action.tags.includes('help')) {
      score += 3;
    }
    if (answers.priority === 'find_work' && action.tags.includes('work')) {
      score += 3;
    }
    if (answers.priority === 'learn_something' && action.tags.includes('learning')) {
      score += 3;
    }
    if (answers.priority === 'get_clarity' && action.tags.includes('clarity')) {
      score += 3;
    }

    // Energy level matching
    if (answers.energy === 'low' && action.time_required <= 30) {
      score += 2;
    }
    if (answers.energy === 'medium' && action.time_required <= 60) {
      score += 1;
    }
    if (answers.energy === 'high') {
      score += 1;
    }

    return score;
  };

  // Select best action from each category
  const selectBestAction = (actions: Action[]): Action => {
    if (actions.length === 0) {
      // Fallback to any action from the category if filters are too strict
      const categoryName = actions === immediateActions ? 'immediate' : 
                           actions === shortTermActions ? 'short_term' : 'skill_building';
      const fallbackActions = allActions.filter(a => a.category === categoryName);
      return fallbackActions[Math.floor(Math.random() * fallbackActions.length)];
    }

    const scoredActions = actions.map((action) => ({
      action,
      score: scoreAction(action),
    }));

    scoredActions.sort((a, b) => b.score - a.score);

    // Add some randomness among top-scored actions to provide variety
    const topScore = scoredActions[0].score;
    const topActions = scoredActions.filter((sa) => sa.score === topScore);
    const selected = topActions[Math.floor(Math.random() * topActions.length)];

    return selected.action;
  };

  return {
    today: selectBestAction(immediateActions),
    thisWeek: selectBestAction(shortTermActions),
    skillToBuild: selectBestAction(skillBuildingActions),
  };
}
