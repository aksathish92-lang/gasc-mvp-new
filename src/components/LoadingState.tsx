export function LoadingState({ message = 'Loading...' }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20" role="status" aria-live="polite">
      <div className="spinner mb-4" />
      <p className="text-navy-600 text-sm font-medium">{message}</p>
    </div>
  );
}
