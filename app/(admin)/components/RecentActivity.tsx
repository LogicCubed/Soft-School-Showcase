"use client";

import { Button } from "components/ui/button";
import { Activity, BookOpen, CreditCard, RotateCcw, ShoppingCart, Tag, Trophy } from "lucide-react";
import ActivityItem from "./ActivityItem";

export default function RecentActivity() {
    return (
        <div className="mt-10 bg-[#0e0d12] rounded-2xl p-6 w-full">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Activity className="w-6 h-6 text-white" />
                  <h3 className="text-white text-lg font-semibold">
                    Recent Activity
                  </h3>
                </div>

                <Button
                  variant="ghost"
                  className="text-slate-300 hover:text-white cursor-pointer"
                >     
                  See All
                </Button>
            </div>

            <div>
              <ActivityItem
                icon={<ShoppingCart className="w-5 h-5" />}
                iconBgClass="bg-emerald-500/20 text-emerald-400"
                title="Purchase Completed"
                description="Soft Skills Pro Annual Plan ($79.00)"
                date={new Date("2026-01-02")}
                tag="Revenue"
                tagClassName="bg-emerald-500/10 text-emerald-400"
              />

              <ActivityItem
                icon={<Tag className="w-5 h-5" />}
                iconBgClass="bg-indigo-500/20 text-indigo-400"
                title='Promo Code Applied'
                description='Code "SOFTY2026" used at checkout'
                date={new Date("2026-01-01")}
                tag="Marketing"
                tagClassName="bg-indigo-500/10 text-indigo-400"
              />

              <ActivityItem
                icon={<CreditCard className="w-5 h-5" />}
                iconBgClass="bg-blue-500/20 text-blue-400"
                title="Subscription Renewed"
                description="Monthly Pro Plan Auto-Renewal ($12.00)"
                date={new Date("2025-12-28")}
                tag="Billing"
                tagClassName="bg-blue-500/10 text-blue-400"
              />

              <ActivityItem
                icon={<RotateCcw className="w-5 h-5" />}
                iconBgClass="bg-rose-500/20 text-rose-400"
                title="Refund Issued"
                description="Partial refund processed ($15.00)"
                date={new Date("2025-12-20")}
                tag="Refund"
                tagClassName="bg-rose-500/10 text-rose-400"
              />
            </div>
        </div>
    );
}