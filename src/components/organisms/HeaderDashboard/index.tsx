export const HeaderDashboard = () => {
  const styles = {
    borderBottom: `0.5px solid rgba(255, 255, 255, 0.20)`,
    background: `var(--COLOR-COLOR, linear-gradient(236deg, rgba(93, 99, 111, 0.10) 1.26%, rgba(25, 30, 40, 0.35) 100%))`,
    backdropFilter: `blur(12px)`,
  };

  return (
    <nav
      style={styles}
      className="h-[80px] z-[9999] fixed top-0 w-full px-8 flex items-center justify-between"
    >
      <img className="h-6" src="/reso.png" />
      <div className="border-animate-wrapper cursor-pointer rounded-full lg:w-[200px] lg:min-w--[150px] lg:min-h-[48px] w-full h-[50px]">
        <div className="border-animate-content text-white bg-black rounded-full flex items-center justify-center">
          Connect Wallet
        </div>
      </div>
    </nav>
  );
};
