'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import QuestionCard from '@/components/QuestionCard';
import Button from '@/components/Button';

interface Answer {
  housing?: string;
  resources?: string[];
  timeAvailable?: number;
  priority?: string;
  energy?: string;
}

export default function QuestionsPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<Answer>({});
  
  const totalSteps = 5;

  const handleNext = (answer: Partial<Answer>) => {
    const newAnswers = { ...answers, ...answer };
    setAnswers(newAnswers);
    
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // Save to sessionStorage and navigate to results
      sessionStorage.setItem('userAnswers', JSON.stringify(newAnswers));
      router.push('/results');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      router.push('/');
    }
  };

  const renderQuestion = () => {
    switch (currentStep) {
      case 1:
        return (
          <QuestionCard
            question="Where are you right now?"
            currentStep={currentStep}
            totalSteps={totalSteps}
          >
            <button
              onClick={() => handleNext({ housing: 'stable' })}
              className="w-full p-6 text-left border-2 border-gray-200 rounded-lg hover:border-gray-900 transition-colors"
            >
              <div className="text-xl font-light text-gray-900">I have stable housing</div>
            </button>
            <button
              onClick={() => handleNext({ housing: 'temporary' })}
              className="w-full p-6 text-left border-2 border-gray-200 rounded-lg hover:border-gray-900 transition-colors"
            >
              <div className="text-xl font-light text-gray-900">I'm staying with someone temporarily</div>
            </button>
            <button
              onClick={() => handleNext({ housing: 'unstable' })}
              className="w-full p-6 text-left border-2 border-gray-200 rounded-lg hover:border-gray-900 transition-colors"
            >
              <div className="text-xl font-light text-gray-900">My housing is unstable or uncertain</div>
            </button>
          </QuestionCard>
        );
      
      case 2:
        return (
          <QuestionCard
            question="What do you have access to today?"
            currentStep={currentStep}
            totalSteps={totalSteps}
          >
            <ResourcesSelector onNext={handleNext} />
          </QuestionCard>
        );
      
      case 3:
        return (
          <QuestionCard
            question="How much time can you spend on this today?"
            currentStep={currentStep}
            totalSteps={totalSteps}
          >
            <button
              onClick={() => handleNext({ timeAvailable: 15 })}
              className="w-full p-6 text-left border-2 border-gray-200 rounded-lg hover:border-gray-900 transition-colors"
            >
              <div className="text-xl font-light text-gray-900">15 minutes or less</div>
            </button>
            <button
              onClick={() => handleNext({ timeAvailable: 30 })}
              className="w-full p-6 text-left border-2 border-gray-200 rounded-lg hover:border-gray-900 transition-colors"
            >
              <div className="text-xl font-light text-gray-900">30 minutes</div>
            </button>
            <button
              onClick={() => handleNext({ timeAvailable: 60 })}
              className="w-full p-6 text-left border-2 border-gray-200 rounded-lg hover:border-gray-900 transition-colors"
            >
              <div className="text-xl font-light text-gray-900">1 hour</div>
            </button>
            <button
              onClick={() => handleNext({ timeAvailable: 180 })}
              className="w-full p-6 text-left border-2 border-gray-200 rounded-lg hover:border-gray-900 transition-colors"
            >
              <div className="text-xl font-light text-gray-900">Several hours</div>
            </button>
          </QuestionCard>
        );
      
      case 4:
        return (
          <QuestionCard
            question="What would help most right now?"
            currentStep={currentStep}
            totalSteps={totalSteps}
          >
            <button
              onClick={() => handleNext({ priority: 'immediate_help' })}
              className="w-full p-6 text-left border-2 border-gray-200 rounded-lg hover:border-gray-900 transition-colors"
            >
              <div className="text-xl font-light text-gray-900">I need immediate help or resources</div>
            </button>
            <button
              onClick={() => handleNext({ priority: 'find_work' })}
              className="w-full p-6 text-left border-2 border-gray-200 rounded-lg hover:border-gray-900 transition-colors"
            >
              <div className="text-xl font-light text-gray-900">I need to find work or make money</div>
            </button>
            <button
              onClick={() => handleNext({ priority: 'learn_something' })}
              className="w-full p-6 text-left border-2 border-gray-200 rounded-lg hover:border-gray-900 transition-colors"
            >
              <div className="text-xl font-light text-gray-900">I want to learn something new</div>
            </button>
            <button
              onClick={() => handleNext({ priority: 'get_clarity' })}
              className="w-full p-6 text-left border-2 border-gray-200 rounded-lg hover:border-gray-900 transition-colors"
            >
              <div className="text-xl font-light text-gray-900">I need clarity on my next step</div>
            </button>
          </QuestionCard>
        );
      
      case 5:
        return (
          <QuestionCard
            question="How's your energy today?"
            currentStep={currentStep}
            totalSteps={totalSteps}
          >
            <button
              onClick={() => handleNext({ energy: 'low' })}
              className="w-full p-6 text-left border-2 border-gray-200 rounded-lg hover:border-gray-900 transition-colors"
            >
              <div className="text-xl font-light text-gray-900">Low - I can manage small tasks</div>
            </button>
            <button
              onClick={() => handleNext({ energy: 'medium' })}
              className="w-full p-6 text-left border-2 border-gray-200 rounded-lg hover:border-gray-900 transition-colors"
            >
              <div className="text-xl font-light text-gray-900">Medium - I can do moderate activities</div>
            </button>
            <button
              onClick={() => handleNext({ energy: 'high' })}
              className="w-full p-6 text-left border-2 border-gray-200 rounded-lg hover:border-gray-900 transition-colors"
            >
              <div className="text-xl font-light text-gray-900">High - I'm ready to take on challenges</div>
            </button>
          </QuestionCard>
        );
      
      default:
        return null;
    }
  };

  return (
    <div>
      {renderQuestion()}
      
      {currentStep > 1 && (
        <div className="fixed bottom-8 left-8">
          <Button variant="secondary" onClick={handleBack}>
            Back
          </Button>
        </div>
      )}
    </div>
  );
}

function ResourcesSelector({ onNext }: { onNext: (answer: Partial<Answer>) => void }) {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleResource = (resource: string) => {
    if (selected.includes(resource)) {
      setSelected(selected.filter(r => r !== resource));
    } else {
      setSelected([...selected, resource]);
    }
  };

  const handleContinue = () => {
    onNext({ resources: selected });
  };

  return (
    <>
      <button
        onClick={() => toggleResource('internet')}
        className={`w-full p-6 text-left border-2 rounded-lg transition-colors ${
          selected.includes('internet')
            ? 'border-gray-900 bg-gray-50'
            : 'border-gray-200 hover:border-gray-400'
        }`}
      >
        <div className="text-xl font-light text-gray-900">Internet access</div>
      </button>
      <button
        onClick={() => toggleResource('phone')}
        className={`w-full p-6 text-left border-2 rounded-lg transition-colors ${
          selected.includes('phone')
            ? 'border-gray-900 bg-gray-50'
            : 'border-gray-200 hover:border-gray-400'
        }`}
      >
        <div className="text-xl font-light text-gray-900">A phone</div>
      </button>
      <button
        onClick={() => toggleResource('computer')}
        className={`w-full p-6 text-left border-2 rounded-lg transition-colors ${
          selected.includes('computer')
            ? 'border-gray-900 bg-gray-50'
            : 'border-gray-200 hover:border-gray-400'
        }`}
      >
        <div className="text-xl font-light text-gray-900">A computer or tablet</div>
      </button>
      
      <div className="pt-6">
        <Button onClick={handleContinue} variant="primary" disabled={selected.length === 0}>
          Continue
        </Button>
      </div>
    </>
  );
}
