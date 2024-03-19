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

  const handleIcon = (name: string, active: boolean) => {
    switch (name) {
      case navigationDashboardName.TRADE:
        return (
          <>
            <IcTrade
              className={`${
                active ? "text-white" : "text-soft group-hover:text-primary"
              }`}
            />
          </>
        );
      case navigationDashboardName.STAKING:
        return (
          <>
            <IcStaking
              className={`${
                active ? "text-white" : "text-soft group-hover:text-primary"
              }`}
            />
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
    <aside
      style={styles}
      className="transition-width fixed left-4 top-[6rem] w-60 z-20 h-full gap-y-3 hidden lg:flex flex-col no-scrollbar"
    >
      <div className="flex h-full min-h-0 flex-1 flex-col justify-between gap-10 p-4">
        <div className="overflow-y-scroll flex flex-col space-y-2">
          {navigationDashboard.map((nav) => (
            <NavLink to={nav.route}>
              {({ isActive }) => (
                <div
                  className={`px-4 py-5 group flex rounded-lg items-center transition-all ease-in-out duration-300 space-x-2 ${
                    isActive
                      ? "bg-primary"
                      : "bg-transparent hover:bg-primary/10"
                  }`}
                >
                  {handleIcon(nav.name.toLowerCase(), isActive)}
                  <Text
                    variant={"heading2"}
                    className={`${
                      isActive
                        ? "text-white"
                        : "text-soft group-hover:text-primary"
                    }`}
                  >
                    {nav.name}
                  </Text>
                </div>
              )}
            </NavLink>
          ))}
        </div>
      </div>
    </aside>
  );
};
