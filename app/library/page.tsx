import type { Metadata } from "next";
import { LibraryClient } from "./LibraryClient";

export const metadata: Metadata = { title: "Strain library", description: "Browse the full GBS strain genetics archive." };
export default function LibraryPage() { return <LibraryClient />; }

