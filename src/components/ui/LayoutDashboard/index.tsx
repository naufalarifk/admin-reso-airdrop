import { Header } from "@/components";
// import { HeaderDashboard } from "@/components/organisms";
import { Outlet } from "react-router-dom";

export const LayoutDashboard = () => {
  return (
    <>
      {/* <HeaderDashboard /> */}
      <Header />
      <div className="flex overflow-hidden pt-4 h-auto mt-20">
        {/* <SidebarDashboard /> */}
        <section className="relative size-full no-scrollbar">
          <div className="h-full">
            <Outlet />
          </div>
        </section>
      </div>
    </>
  );
};
