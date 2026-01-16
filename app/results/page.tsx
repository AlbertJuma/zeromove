'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ActionCard from '@/components/ActionCard';
import Button from '@/components/Button';
import { MatchedActions } from '@/lib/actionMatcher';

export default function ResultsPage() {
  const router = useRouter();
  const [actions, setActions] = useState<MatchedActions | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActions = async () => {
      const answersJson = sessionStorage.getItem('userAnswers');
      
      if (!answersJson) {
        router.push('/questions');
        return;
      }

      try {
        const response = await fetch('/api/actions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: answersJson,
        });

        if (!response.ok) {
          throw new Error('Failed to fetch actions');
        }

        const data = await response.json();
        setActions(data);
      } catch (error) {
        console.error('Error fetching actions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchActions();
  }, [router]);

  const handleDone = () => {
    sessionStorage.removeItem('userAnswers');
    router.push('/');
  };

  const handleGetDifferent = () => {
    router.push('/questions');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-xl text-gray-500">Loading your actions...</div>
      </div>
    );
  }

  if (!actions) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-xl text-gray-500">Something went wrong. Please try again.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white px-4 py-12">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl sm:text-5xl font-light text-gray-900 leading-tight">
            Here's what to do next.
          </h1>
        </div>

        <div className="space-y-6 pt-8">
          <ActionCard title="Today" action={actions.today} />
          <ActionCard title="This Week" action={actions.thisWeek} />
          <ActionCard title="Skill to Build" action={actions.skillToBuild} />
        </div>

        <div className="text-center space-y-3 pt-8 pb-4">
          <p className="text-lg text-gray-600">You don't have to do all three.</p>
          <p className="text-lg text-gray-600">Start with what feels possible.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
          <Button variant="primary" onClick={handleDone}>
            Done
          </Button>
          <Button variant="secondary" onClick={handleGetDifferent}>
            Get Different Actions
          </Button>
        </div>
      </div>
    </div>
  );
}
