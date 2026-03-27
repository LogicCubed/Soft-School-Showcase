"use client";

import Calendar from "../../components/Calendar";
import HeroCard from "../../components/HeroCard";

export default function TeacherDashboard() {
  return (
    <main className="min-h-screen p-8 relative flex flex-col lg:flex-row">
      {/* Left/main content */}
      <div className="flex-1 lg:pr-8">
        <div className="mb-12">
          <HeroCard
            title="Welcome, Teacher!"
            subtext="Inspire, guide, and watch them grow!"
            imageUrl="/assets/teachers/teacher-hero.png"
          />
        </div>

        {/* Other dashboard sections */}
        <div className="space-y-8">
          {/* Other dashboard content */}
        </div>
      </div>

      <div className="w-full lg:w-80 lg:ml-auto shrink-0 lg:sticky lg:top-8">
        <Calendar />
      </div>
    </main>
  );
}