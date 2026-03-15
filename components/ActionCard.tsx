import { Action } from '@/lib/actionMatcher';

interface ActionCardProps {
  title: string;
  action: Action;
}

export default function ActionCard({ title, action }: ActionCardProps) {
  return (
    <div className="border-2 border-gray-200 rounded-lg p-6 space-y-4">
      <div className="text-sm uppercase tracking-wide text-gray-500 font-medium">
        {title}
      </div>
      
      <h3 className="text-2xl font-light text-gray-900 leading-tight">
        {action.title}
      </h3>
      
      <p className="text-base text-gray-700 leading-relaxed">
        {action.description}
      </p>
      
      <div className="flex items-center gap-4 text-sm text-gray-500 pt-2">
        <span>{action.time_required} min</span>
        {action.requires_internet && <span>• Internet needed</span>}
        {action.requires_phone && <span>• Phone needed</span>}
        {action.requires_computer && <span>• Computer needed</span>}
      </div>
    </div>
  );
}
