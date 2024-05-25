import { Header } from '@/components';
// import { HeaderDashboard } from "@/components/organisms";
import { Outlet } from 'react-router-dom';

export const LayoutDashboard = () => {
   return (
      <>
         {/* <HeaderDashboard /> */}
         <Header />
         <div className="lg:mt-18 mt-16 flex h-auto overflow-hidden pt-3.5">
            {/* <SidebarDashboard /> */}
            <section className="no-scrollbar relative h-full w-full">
               <Outlet />
            </section>
         </div>
      </>
   );
};
