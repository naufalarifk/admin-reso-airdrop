import { Header } from "@/components";
import { HeaderDashboard, SidebarDashboard } from "@/components/organisms";
import { Outlet } from "react-router-dom";

export const LayoutDashboard = () => {
  return (
    <>
      {/* <HeaderDashboard />
       */}
      <Header />
      <div className="flex overflow-hidden pt-4 p-4 h-auto  mt-20">
        <SidebarDashboard />
        <section className="relative h-full w-full overflow-y-auto no-scrollbar">
          <div className="lg:ml-64 h-full">
            <Outlet />
          </div>
        </section>
      </div>
    </>
  );
};
