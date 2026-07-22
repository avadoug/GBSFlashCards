import type { Metadata } from "next";
import { SettingsClient } from "./SettingsClient";
export const metadata: Metadata = { title: "Settings", description: "Tune study modes, motion, weighted review, sound, and local progress." };
export default function SettingsPage() { return <SettingsClient />; }

