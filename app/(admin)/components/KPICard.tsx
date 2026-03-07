"use client";

import { LucideIcon } from "lucide-react";

type KpiCardProps = {
    icon: LucideIcon;
    title: string;
    value: string;
};

export default function KpiCard({
    icon: Icon,
    title,
    value,
}: KpiCardProps) {
    return (
      <div className="bg-[#0e0d12] rounded-2xl p-6 flex items-center gap-5 w-full">
          <Icon className="w-12 h-12 text-white" />
          <div className="flex flex-col">
              <span className="text-slate-200 text-sm font-medium">
                  {title}
              </span>
              <span className="text-white text-2xl font-bold">
                  {value}
              </span>
          </div>
      </div>
    );
}