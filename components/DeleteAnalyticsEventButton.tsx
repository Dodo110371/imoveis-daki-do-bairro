'use client';
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Trash2 } from "lucide-react";

export function DeleteAnalyticsEventButton({ eventId }: { eventId: string }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const onDelete = async () => {
    if (isDeleting) return;
    const ok = window.confirm("Excluir este registro de clique?");
    if (!ok) return;

    setIsDeleting(true);
    try {
      const res = await fetch(`/admin/api/analytics-events/${eventId}`, { method: "DELETE" });
      if (!res.ok) return;
      router.refresh();
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button
      type="button"
      onClick={onDelete}
      disabled={isDeleting}
      className="inline-flex items-center justify-center p-2 rounded-md border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900 disabled:opacity-50 disabled:cursor-not-allowed"
      aria-label="Excluir"
      title="Excluir"
    >
      <Trash2 className="h-4 w-4" />
    </button>
  );
}

