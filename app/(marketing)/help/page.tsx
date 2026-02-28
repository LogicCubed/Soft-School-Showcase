"use client";

import { useState } from "react";
import {
  HelpCircle,
  BarChart3,
  CreditCard,
  Shield,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

type FAQItem = {
  id: number;
  title: string;
  content: string;
  icon: React.ReactNode;
};

const faqs: FAQItem[] = [
  {
    id: 1,
    title: "What is Soft School?",
    content:
      "Soft School is an interactive platform focused on building real-world soft skills such as communication, leadership, and emotional intelligence through structured lessons and challenges.",
    icon: <HelpCircle size={36} strokeWidth={3} className="text-white" />,
  },
  {
    id: 2,
    title: "How does progress tracking work?",
    content:
      "Your lessons, quiz performance, streaks, and achievements are automatically tracked to help you measure improvement over time.",
    icon: <BarChart3 size={36} strokeWidth={3} className="text-white" />,
  },
  {
    id: 3,
    title: "Is Soft School free to use?",
    content:
      "Soft School may offer limited free features for individual users. However, the platform is primarily delivered through premium partnerships with school districts, educational institutions, and learning providers. Access to full courses, progress systems, and advanced features is typically provided through those institutional plans.",
    icon: <CreditCard size={36} strokeWidth={3} className="text-white" />,
  },
  {
    id: 4,
    title: "How is my data protected?",
    content:
      "We implement standard security practices to protect account information and learning data. You remain in control of your account settings.",
    icon: <Shield size={36} strokeWidth={3} className="text-white" />,
  },
];

export default function FAQ() {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggle = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="min-h-screen w-full px-6 py-20">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-4xl font-bold mb-10">
          Frequently Asked Questions
        </h1>

        {faqs.map((faq) => {
          const isOpen = openId === faq.id;

          return (
            <div
              key={faq.id}
              className="border border-slate-800 rounded-2xl overflow-hidden bg-slate-900/40"
            >
              <div className="flex items-center justify-between px-6 py-5">
                {/* Left Section (clickable area for toggle) */}
                <button
                  onClick={() => toggle(faq.id)}
                  className="flex items-center gap-4 text-left"
                >
                  {faq.icon}

                  <span className="text-lg font-semibold text-white">
                    {faq.title}
                  </span>
                </button>

                {/* Chevron (explicit pointer) */}
                <ChevronDown
                  onClick={() => toggle(faq.id)}
                  className={cn(
                    "text-white transition-transform duration-300 cursor-pointer",
                    isOpen && "rotate-180"
                  )}
                  size={24}
                  strokeWidth={3}
                />
              </div>

              {/* Content */}
              <div
                className={cn(
                  "grid transition-all duration-300 ease-in-out",
                  isOpen
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                )}
              >
                <div className="overflow-hidden">
                  <div className="px-6 pb-6 text-slate-300 leading-relaxed">
                    {faq.content}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}