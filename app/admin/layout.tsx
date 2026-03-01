"use client";

import { AdminSidebar } from "./components/Sidebar";

type Props = {
  children: React.ReactNode;
};

const MainAdminLayout = ({ children }: Props) => {
  return (
    <div className="flex min-h-screen bg-[#131118] text-white">
      <AdminSidebar className="hidden lg:flex w-64" />

      <div className="flex-1 flex flex-col items-start justify-start overflow-x-hidden p-8 lg:ml-64">
        {children}
      </div>
    </div>
  );
};

export default MainAdminLayout;