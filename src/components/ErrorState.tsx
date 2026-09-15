import { AlertCircle } from 'lucide-react';

export function ErrorState({
  message = 'Something went wrong. Please try again later.',
  onRetry,
}: {
  message?: string;
  onRetry?: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center" role="alert">
      <AlertCircle className="w-10 h-10 text-maroon-600 mb-3" strokeWidth={1.5} />
      <p className="text-navy-700 text-sm max-w-md">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-4 px-5 py-2 bg-navy-800 text-white text-sm font-medium rounded-lg hover:bg-navy-700 transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  );
}
