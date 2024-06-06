import { cn } from '@/utils';
import type { Variants } from 'framer-motion';
import { AnimatePresence, motion } from 'framer-motion';
import type { ReactNode, FC } from 'react';
import { useState, useRef, useEffect, useMemo } from 'react';

interface TabsData {
   label: ReactNode;
   content: ReactNode;
}

type TabsProps = {
   items: TabsData[];
   getCurrentIndex?: (index: number) => void;
   isBetween?: boolean;
   classNameWrapper?: string;
   rightContent?: ReactNode;
   classNameButtons?: string;
   isMaxWidth?: boolean;
   transparent?: boolean;
};

const variants: Variants = {
   hidden: { opacity: 0, x: -20, y: 0 },
   enter: { opacity: 1, x: 0, y: 0 },
   exit: { opacity: 0, x: 20, y: 0 },
};

export const TabSlider: FC<TabsProps> = ({
   items,
   getCurrentIndex,
   isMaxWidth = false,
   transparent = false,
}) => {
   const [activeTabIndex, setActiveTabIndex] = useState(0);
   const [tabUnderlineWidth, setTabUnderlineWidth] = useState(0);
   const [tabUnderlineLeft, setTabUnderlineLeft] = useState(0);

   const tabsRef = useRef<Array<HTMLButtonElement>>([]);

   useEffect(() => {
      const setTabPosition = () => {
         const currentTab = tabsRef.current[activeTabIndex];
         setTabUnderlineLeft(currentTab?.offsetLeft ?? 0);
         setTabUnderlineWidth(currentTab?.clientWidth ?? 0);
      };

      setTabPosition();
      window.addEventListener('resize', setTabPosition);

      return () => window.removeEventListener('resize', setTabPosition);
   }, [activeTabIndex]);

   const contents = useMemo(() => items[activeTabIndex].content, [activeTabIndex, items]);

   const handleTabClick = (index: number) => {
      setActiveTabIndex(index);
      getCurrentIndex && getCurrentIndex(index);
   };

   return (
      <>
         <div
            className={cn(
               `relative flex w-full justify-start  border-b-primary/45 ${transparent ? 'border-0 bg-transparent' : 'border-b bg-dark2 '}   lg:justify-start`,
            )}>
            {items.map((tab, idx) => (
               <button
                  key={idx}
                  type="button"
                  ref={(el: HTMLButtonElement | null) =>
                     (tabsRef.current[idx] = el as HTMLButtonElement)
                  }
                  className={cn(
                     ` ${isMaxWidth ? 'w-fit' : 'w-full'} px-5 py-2 text-center text-xs font-semibold  lg:px-5  lg:py-3`,
                  )}
                  onClick={() => handleTabClick(idx)}>
                  {tab.label}
               </button>
            ))}
            <div
               className="absolute bottom-0 h-[0.2rem]  rounded-t-md bg-primary transition-all duration-300 ease-in-out"
               style={{
                  left: tabUnderlineLeft,
                  width: tabUnderlineWidth,
               }}
            />
         </div>

         <AnimatePresence mode="wait">
            <motion.div
               key={activeTabIndex}
               initial="hidden"
               animate="enter"
               exit="exit"
               variants={variants}
               className="mt-0 h-full lg:mt-4">
               {contents}
            </motion.div>
         </AnimatePresence>
      </>
   );
};
