import { Outlet } from "react-router-dom";

export const MainMenu = () => {
  return (
    <div className="relative w-[100vw] h-[100vh]">
      <svg
        className="absolute -top-40 -left-[500px]"
        xmlns="http://www.w3.org/2000/svg"
        width="130%"
        height="130%"
        viewBox="0 0 1704 963"
        fill="none"
      >
        <path
          opacity="0.6"
          d="M793.284 962.455C1295.8 962.455 1703.17 555.083 1703.17 52.5649C1703.17 -449.954 1295.8 -857.325 793.284 -857.325C290.765 -857.325 -116.606 -449.954 -116.606 52.5649C-116.606 555.083 290.765 962.455 793.284 962.455Z"
          fill="url(#paint0_radial_323_2534)"
          fill-opacity="0.6"
        />
        <defs>
          <radialGradient
            id="paint0_radial_323_2534"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(742.879 147.716) rotate(90) scale(839.854)"
          >
            <stop stop-color="#FE9F00" stop-opacity="0.61" />
            <stop offset="1" stop-opacity="0" />
            <stop offset="1" stop-opacity="0" />
          </radialGradient>
        </defs>
      </svg>
      <svg
        className="absolute top-0 right-0"
        xmlns="http://www.w3.org/2000/svg"
        width="1540"
        height="1400"
        viewBox="0 0 1540 1400"
        fill="none"
      >
        <path
          opacity="0.4"
          d="M1634.45 2621.07C2536.68 2621.07 3268.08 1889.67 3268.08 987.439C3268.08 85.2114 2536.68 -646.189 1634.45 -646.189C732.224 -646.189 0.82373 85.2114 0.82373 987.439C0.82373 1889.67 732.224 2621.07 1634.45 2621.07Z"
          fill="url(#paint0_radial_76_17869)"
          fill-opacity="0.8"
        />
        <defs>
          <radialGradient
            id="paint0_radial_76_17869"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(1623.54 1268.53) rotate(87.21) scale(1655.8)"
          >
            <stop stop-color="#FE9F00" stop-opacity="0.67" />
            <stop offset="1" stop-opacity="0" />
          </radialGradient>
        </defs>
      </svg>
      <Outlet />
    </div>
  );
};
