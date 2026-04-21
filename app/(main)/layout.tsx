import { Footer } from "@/components/Footer";
import { SidebarWrapper } from "./components/sidebar/Sidebar-Wrapper";
import { Header } from "@/components/Header";

type Props = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: Props) => {
  return (
    <div className="min-h-screen bg-background text-foreground">

      <div className="lg:hidden">
        <Header />
      </div>

      {/* Sidebar on large screens */}
      <div className="hidden lg:block">
        <SidebarWrapper />
      </div>

      {/* Main content */}
      <main className="lg:pl-64 h-full pt-12.5 lg:pt-0">
        <div className="max-w-264 mx-auto pt-6 h-full">
          {children}
        </div>
      </main>

      <div className="lg:hidden">
        <Footer />
      </div>

    </div>
  );
};

export default MainLayout;