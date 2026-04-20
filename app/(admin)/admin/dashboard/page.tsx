"use client";

import {
  DollarSign,
  Users,
  UserCheck,
  UserPlus,
  TrendingDown,
} from "lucide-react";
import KpiCard from "../../components/KPICard";
import RevenueChart from "../../components/RevenueChart";
import RecentActivity from "../../components/RecentActivity";
import { useUser } from "@clerk/nextjs";

export default function AdminDashboard() {
    const { user, isLoaded } = useUser();

    if (!isLoaded) {
      return null;
    }

    return (
      <main className="min-h-screen">
          {/* Top section */}
          <div className="mb-12">
            <h2 className="font-bold">
              <span className="text-white text-4xl">Welcome, </span>
              <span className="text-slate-400 text-2xl">
                {user?.firstName}
              </span>
            </h2>
          </div>

          {/* KPI Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            <KpiCard icon={DollarSign} title="MRR" value="$0" />
            <KpiCard icon={Users} title="Active Subscriptions" value="0" />
            <KpiCard icon={UserCheck} title="Active Users (7 Days)" value="0" />
            <KpiCard icon={UserPlus} title="New Signups (30 Days)" value="0" />
            <KpiCard icon={TrendingDown} title="Churn" value="0%" />
          </div>

          {/*Line Chart */}
          <div>
            <RevenueChart/>
          </div>

          {/* Recent Activity */}
          <div>
            <RecentActivity/>
          </div>
      </main>
    );
}