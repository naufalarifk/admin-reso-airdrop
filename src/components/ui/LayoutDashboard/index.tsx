import { Header } from '@/components';
// import { HeaderDashboard } from "@/components/organisms";
import { Outlet } from 'react-router-dom';

export const LayoutDashboard = () => {
   return (
      <>
         {/* <HeaderDashboard /> */}
         <Header />
         <div className="mt-20 flex h-auto overflow-hidden pt-4">
            {/* <SidebarDashboard /> */}
            <section className="no-scrollbar relative h-full w-full">
               <Outlet />
            </section>
         </div>
      </>
   );
};
