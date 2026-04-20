import { requireAdmin } from "@/lib/server/auth/admin";
import { AdminSidebar } from "./components/Sidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdmin();

  return (
    <div className="flex min-h-screen bg-[#131118] text-white">
      <AdminSidebar className="hidden lg:flex w-64" />

      <div className="flex-1 flex flex-col items-start justify-start overflow-x-hidden p-8 lg:ml-64">
        {children}
      </div>
    </div>
  );
}