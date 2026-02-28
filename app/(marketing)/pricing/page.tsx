"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PricingCard from "./PricingCard";

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">(
    "annual"
  );

  const isAnnual = billingCycle === "annual";

  return (
    <main className="min-h-screen text-white mb-50">
      <div className="max-w-6xl mx-auto px-6 py-24">
        {/* Headline */}
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold">
            Flexible Plans for Every Learning Environment
          </h1>
          <p className="mt-4 text-neutral-400">
            Individual learners, single campuses, and entire districts can all
            scale with Soft School’s structured learning system.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center mt-12">
          <div className="relative bg-neutral-900 border border-white/10 rounded-full p-1 flex">
            {/* Animated Pill */}
            <motion.div
              layout
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className={`absolute top-1 bottom-1 w-1/2 rounded-full bg-white`}
              style={{
                left: billingCycle === "monthly" ? "4px" : "50%",
              }}
            />

            <button
              onClick={() => setBillingCycle("monthly")}
              className={`relative z-10 cursor-pointer px-6 py-2 rounded-full text-sm w-24 ${
                billingCycle === "monthly"
                  ? "text-black"
                  : "text-neutral-400"
              }`}
            >
              Monthly
            </button>

            <button
              onClick={() => setBillingCycle("annual")}
              className={`relative z-10 cursor-pointer px-6 py-2 rounded-full text-sm w-24 ${
                billingCycle === "annual"
                  ? "text-black"
                  : "text-neutral-400"
              }`}
            >
              Annual
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <PricingCard
            title="Individual"
            subtitle="For independent learners"
            price={
              <AnimatedPrice value={isAnnual ? "$8" : "$12"} />
            }
            billing={isAnnual ? "/month (billed annually)" : "/month"}
            features={[
              "Full course access",
              "Games and streak system",
              "Personal progress tracking",
              "Join classes with a code",
            ]}
            cta="Start Learning"
          />

          <PricingCard
            title="School"
            subtitle="For a single campus"
            price={
              <AnimatedPrice value={isAnnual ? "$8" : "$10"} />
            }
            billing={
              isAnnual
                ? "/ student / month (billed annually)"
                : "/ student / month"
            }
            features={[
              "Unlimited teachers",
              "Unlimited students",
              "Class creation and management",
              "Assignment tracking",
              "Teacher analytics dashboard",
            ]}
            cta="Request School Plan"
            highlighted
          />

          <PricingCard
            title="District"
            subtitle="For multi-school organizations"
            price="Custom"
            billing="enterprise pricing"
            features={[
              "Everything in School",
              "District-wide analytics",
              "Multi-school management",
              "SSO integration",
              "Dedicated onboarding",
            ]}
            cta="Contact Sales"
          />
        </div>
      </div>
    </main>
  );
}

/* Animated Price Component */
function AnimatedPrice({ value }: { value: string }) {
  return (
    <div className="relative h-10">
      <AnimatePresence mode="wait">
        <motion.span
          key={value}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className="absolute text-4xl font-bold"
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}