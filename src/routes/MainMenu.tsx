import { Outlet } from "react-router-dom";

export const MainMenu = () => {
  return (
    <div className="relative w-[100vw] h-[100vh] overflow-x-hidden">
      <img
        src="/images/wave.png"
        className="absolute w-[1920px] h-[1080px] -top-1"
        alt=""
      />
      <Outlet />
    </div>
  );
};
