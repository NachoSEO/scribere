interface EmptyStateProps {
  message: string;
  action?: string;
  onAction?: () => void;
}

export function EmptyState({ message, action, onAction }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <p className="text-sm text-[var(--color-ink-muted)]">{message}</p>
      {action && onAction && (
        <button
          onClick={onAction}
          className="mt-4 rounded-md bg-[var(--color-accent)] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[var(--color-accent-dark)]"
        >
          {action}
        </button>
      )}
    </div>
  );
}
