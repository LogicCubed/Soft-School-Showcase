import { Sidebar } from "./components/Sidebar";


type Props = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: Props) => {
  return (
    <div className="min-h-screen bg-[#131118] text-white">

      {/* Sidebar on large screens */}
      <Sidebar className="hidden lg:flex" />

      {/* Main content */}
      <main className="lg:pl-64 h-full pt-12.5 lg:pt-0">
        <div className="max-w-264 mx-auto pt-6 h-full">
          {children}
        </div>
      </main>

    </div>
  );
};

export default MainLayout;