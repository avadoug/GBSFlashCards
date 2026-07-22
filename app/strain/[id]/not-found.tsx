import Link from "next/link";
export default function NotFound() { return <main className="content-page"><div className="empty-state"><h1>Archive record not found</h1><p>This strain ID is not in the local library.</p><Link href="/library">Return to the library</Link></div></main>; }

