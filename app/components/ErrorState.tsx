import { AlertTriangle } from "lucide-react";

export function ErrorState({ message }: { message: string }) {
  return <div className="empty-state error"><AlertTriangle size={34} /><h2>The archive could not be opened</h2><p>{message}</p></div>;
}

