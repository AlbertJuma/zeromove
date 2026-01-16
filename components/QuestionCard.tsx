interface QuestionCardProps {
  question: string;
  children: React.ReactNode;
  currentStep: number;
  totalSteps: number;
}

export default function QuestionCard({
  question,
  children,
  currentStep,
  totalSteps,
}: QuestionCardProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 py-8">
      <div className="max-w-2xl w-full">
        <div className="mb-6 text-sm text-gray-500">
          {currentStep} of {totalSteps}
        </div>
        
        <h2 className="text-3xl sm:text-4xl font-light text-gray-900 mb-8 leading-tight">
          {question}
        </h2>
        
        <div className="space-y-4">
          {children}
        </div>
      </div>
    </div>
  );
}
