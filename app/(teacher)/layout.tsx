"use client";

import { TeacherSidebar } from "./components/Sidebar";

type Props = {
  children: React.ReactNode;
};

const MainTeacherLayout = ({ children }: Props) => {
  return (
    <div className="flex min-h-screen bg-[#F8FAFC] text-white">
      <TeacherSidebar className="hidden lg:flex w-64" />

      <div className="flex-1 flex flex-col items-start justify-start overflow-x-hidden p-8 lg:ml-64">
        {children}
      </div>
    </div>
  );
};

export default MainTeacherLayout;