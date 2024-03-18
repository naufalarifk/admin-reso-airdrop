import { SidebarDashboard, HeaderDashboard } from "@/components/organisms";
import { Outlet } from "react-router-dom";

export const LayoutDashboard = () => {
    return (
        <>
            <HeaderDashboard
            />
            <div className="flex overflow-hidden pt-4 p-4 h-auto lg:ml-56 mt-20">
                <SidebarDashboard
                />
                <section className="relative h-full w-full overflow-y-auto no-scrollbar">
                    <div className="lg:ml-4 h-full">
                        <Outlet />
                    </div>
                </section>
            </div>
        </>
    )
}