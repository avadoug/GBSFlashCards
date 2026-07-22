import type { Metadata } from "next";
import { StatisticsDashboard } from "./StatisticsDashboard";
export const metadata: Metadata = { title: "Statistics", description: "Review local study accuracy, streaks, and progress by breeder and genetic family." };
export default function StatisticsPage() { return <StatisticsDashboard />; }

