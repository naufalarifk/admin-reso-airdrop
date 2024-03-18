import { IcStaking, IcSwap, IcTrade } from "@/assets/icons";
import { Text } from "@/components";
import { navigationDashboard, navigationDashboardName } from "@/constants";
import { NavLink } from "react-router-dom";

export const SidebarDashboard = () => {
  const styles = {
    borderRadius: `4px`,
    border: `0.5px solid rgba(255, 255, 255, 0.10)`,
    background: `var(--COLOR - COLOR, linear - gradient(236deg, rgba(93, 99, 111, 0.10) 1.26 %, rgba(25, 30, 40, 0.35) 100 %))`,
    backdropFilter: `blur(12px)`,
  };

  const handleIcon = (name: string) => {
    switch (name) {
      case navigationDashboardName.TRADE:
        return (
          <>
            <IcTrade />
          </>
        );
      case navigationDashboardName.STAKING:
        return (
          <>
            <IcStaking />
          </>
        );
      case navigationDashboardName.BRIDGE:
        return (
          <>
            <IcSwap />
          </>
        );
      case navigationDashboardName.SWAP:
        return (
          <>
            <IcSwap />
          </>
        );
      default:
        return;
    }
  };

  return (
    <nav
      style={styles}
      className="transition-width fixed left-4 top-[6rem] z-20 h-full gap-y-3 hidden lg:flex flex-col no-scrollbar"
    >
      <div className="flex h-full min-h-0 flex-1 flex-col justify-between gap-10 p-4">
        <div className="h-5/6 overflow-y-scroll">
          {navigationDashboard.map((nav) => (
            <>
              <NavLink to={nav.route}>
                {() => (
                  <div className="mr-16 px-4 py-5 flex items-center space-x-2">
                    {handleIcon(nav.name.toLowerCase())}
                    <Text variant={"heading2"} className="text-white">
                      {nav.name}
                    </Text>
                  </div>
                )}
              </NavLink>
            </>
          ))}
        </div>
      </div>
    </nav>
  );
};
