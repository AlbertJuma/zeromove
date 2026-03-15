import { NextRequest, NextResponse } from 'next/server';
import { matchActions, UserAnswers } from '@/lib/actionMatcher';

export async function POST(request: NextRequest) {
  try {
    const answers: UserAnswers = await request.json();

    // Validate the answers
    if (!answers.housing || answers.resources === undefined || !answers.timeAvailable || !answers.priority || !answers.energy) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get matched actions
    const matchedActions = matchActions(answers);

    return NextResponse.json(matchedActions);
  } catch (error) {
    console.error('Error matching actions:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
