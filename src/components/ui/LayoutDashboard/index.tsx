import { Header } from '@/components';
// import { HeaderDashboard } from "@/components/organisms";
import { Outlet } from 'react-router-dom';

export const LayoutDashboard = () => {
   return (
      <>
         {/* <HeaderDashboard /> */}
         <Header />
         <div className="mt-16 flex h-auto overflow-hidden pt-3.5 lg:mt-20 lg:pt-4">
            {/* <SidebarDashboard /> */}
            <section className="no-scrollbar relative h-full w-full">
               <Outlet />
            </section>
         </div>
      </>
   );
};
