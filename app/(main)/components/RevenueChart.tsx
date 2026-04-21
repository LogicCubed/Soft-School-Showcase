"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { DollarSign } from "lucide-react";
import { Button } from "components/ui/button";

const data = [
  { period: "Jan", revenue: 0 },
  { period: "Feb", revenue: 0 },
  { period: "Mar", revenue: 0 },
  { period: "Apr", revenue: 0 },
  { period: "May", revenue: 0 },
  { period: "Jun", revenue: 0 },
  { period: "Jul", revenue: 0 },
  { period: "Aug", revenue: 0 },
  { period: "Sep", revenue: 0 },
  { period: "Oct", revenue: 0 },
  { period: "Nov", revenue: 0 },
  { period: "Dec", revenue: 0 },
];

export default function RevenueChart() {
    return (
        <div className="mt-10 bg-[#0e0d12] rounded-2xl p-6 w-full">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <DollarSign className="w-6 h-6 text-white" />
                    <h3 className="text-white text-lg font-semibold">
                        Sales Revenue
                    </h3>
                </div>

                <div className="flex gap-6 text-sm text-slate-300">
                    <Button
                        variant="ghost"
                        className="text-slate-300 hover:text-white cursor-pointer"
                    >
                        Monthly
                    </Button>
                    <Button
                        variant="ghost"
                        className="text-slate-300 hover:text-white cursor-pointer"
                    >
                        Quarterly
                    </Button>
                    <Button
                        variant="ghost"
                        className="text-slate-300 hover:text-white cursor-pointer"
                    >
                        Yearly
                    </Button>
                </div>
            </div>

            <div className="w-full h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <CartesianGrid stroke="#1f1d27" strokeDasharray="3 3" />
                        <XAxis
                            dataKey="period"
                            stroke="#94a3b8"
                            tick={{ fill: "#94a3b8" }}
                        />
                        <YAxis
                            stroke="#94a3b8"
                            tick={{ fill: "#94a3b8" }}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "#1a1822",
                                border: "none",
                                borderRadius: "12px",
                                color: "white",
                            }}
                        />
                        <Line
                            type="monotone"
                            dataKey="revenue"
                            stroke="#6366f1"
                            strokeWidth={3}
                            dot={false}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}