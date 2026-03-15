import Link from 'next/link';
import Button from './Button';

export default function WelcomeScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        <h1 className="text-4xl sm:text-5xl font-light text-gray-900 leading-tight">
          Welcome to ZeroMove.
        </h1>
        
        <div className="space-y-4 text-lg sm:text-xl text-gray-700 leading-relaxed">
          <p>Answer a few questions.</p>
          <p>Get one clear action to take today.</p>
        </div>
        
        <div className="space-y-3 text-base sm:text-lg text-gray-600 pt-4">
          <p>No pressure. No judgment.</p>
          <p>Just what makes sense next.</p>
        </div>
        
        <div className="pt-8">
          <Link href="/questions">
            <Button variant="primary">Start</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
