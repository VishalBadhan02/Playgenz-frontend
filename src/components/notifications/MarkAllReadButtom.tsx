// components/notifications/MarkAllReadButton.tsx
import { Check } from 'lucide-react';

interface Props {
  onClick: () => void;
}

export const MarkAllReadButton: React.FC<Props> = ({ onClick }) => (
  <button
    className="flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm hover:bg-secondary transition-colors"
    onClick={onClick}
  >
    <Check className="h-4 w-4" />
    <span>Mark All Read</span>
  </button>
);
