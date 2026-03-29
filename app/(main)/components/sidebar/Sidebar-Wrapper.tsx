import { isAdmin } from "@/lib/server/auth/admin";
import { Sidebar } from "./Sidebar";

export const SidebarWrapper = async () => {
    const admin = await isAdmin();
    return <Sidebar isAdmin={admin} />;
};