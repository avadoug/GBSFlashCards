import Link from "next/link";
import { SearchX } from "lucide-react";

export function EmptyState({ title = "No strains match this set", message = "Clear a filter or choose another study mode to continue." }: { title?: string; message?: string }) {
  return <div className="empty-state"><SearchX size={34} /><h2>{title}</h2><p>{message}</p><Link href="/library">Browse the full library</Link></div>;
}

