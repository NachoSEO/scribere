"use client";

interface DeleteConfirmProps {
  entityName: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function DeleteConfirm({ entityName, onConfirm, onCancel }: DeleteConfirmProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="mx-4 w-full max-w-sm rounded-lg border border-[var(--color-border)] bg-white p-6 shadow-lg">
        <h3 className="text-sm font-semibold text-[var(--color-ink)]">Eliminar {entityName}</h3>
        <p className="mt-2 text-sm text-[var(--color-ink-light)]">
          Esta acción no se puede deshacer. Se eliminarán también todas las relaciones asociadas.
        </p>
        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="rounded-md border border-[var(--color-border)] px-3 py-1.5 text-sm text-[var(--color-ink-light)] transition-colors hover:bg-[var(--color-cream-dark)]"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="rounded-md bg-red-600 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-red-700"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}
