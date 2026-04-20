"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ActivityItemProps = {
  icon: ReactNode;
  iconBgClass?: string;
  title: string;
  description: string;
  date: Date;
  tag: string;
  tagClassName?: string;
};

export default function ActivityItem({
  icon,
  iconBgClass = "bg-indigo-500/20 text-indigo-400",
  title,
  description,
  date,
  tag,
  tagClassName = "bg-[#1f1d27] text-slate-300",
}: ActivityItemProps) {
    return (
        <div className="w-full flex items-center justify-between py-4 border-b border-[#1f1d27] last:border-none">
            <div className="flex items-start gap-4 flex-1 min-w-0">
                {/* Icon */}
                <div
                    className={cn(
                        "flex items-center justify-center w-10 h-10 rounded-xl",
                        iconBgClass
                    )}
                >
                    {icon}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    <h4 className="text-white font-medium truncate">{title}</h4>

                    <div className="flex items-center text-sm text-slate-400 mt-1 gap-2">
                        <p className="truncate">{description}</p>

                        <span className="w-1.5 h-1.5 rounded-full bg-slate-500 shrink-0" />

                        <span className="shrink-0">
                            {date.toLocaleDateString("en-GB", {
                                day: "numeric",
                                month: "short",
                                year: "2-digit",
                            })}
                        </span>
                    </div>
                </div>
            </div>

            {/* Tag */}
            <div
                className={cn(
                "ml-6 px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap",
                tagClassName
                )}
            >
                {tag}
            </div>
        </div>
    );
}