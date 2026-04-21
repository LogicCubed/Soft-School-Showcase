"use client";

import {
  Package,
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
import dynamic from "next/dynamic";

const Map = dynamic(() => import("../../components/Map"), {
  ssr: false,
});

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
              <span className="text-white text-4xl">Welcome back, </span>
              <span className="text-white text-4xl">
                {user?.firstName || "Guest!"}
              </span>
            </h2>
          </div>

          {/* KPI Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            <KpiCard icon={Package} title="This Month's Orders" value="0" />
            <KpiCard icon={Users} title="Active Subscriptions" value="0" />
            <KpiCard icon={UserCheck} title="Active Users (7 Days)" value="0" />
            <KpiCard icon={UserPlus} title="New Signups (30 Days)" value="0" />
            <KpiCard icon={TrendingDown} title="Churn" value="0%" />
          </div>

          {/*Line Chart */}
          <div>
            <RevenueChart/>
          </div>

          {/*Subscriber locations */}
          <div>
            <Map/>
          </div>

          {/* Recent Activity */}
          <div>
            <RecentActivity/>
          </div>
      </main>
    );
}