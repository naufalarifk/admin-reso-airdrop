export const ButtonGlow = ({ children }: { children: string }) => {
  return (
    <>
      <div className="border-animate-wrapper rounded-full w-[150px] min-w--[150px] min-h-[48px]">
        <div className="border-animate-content text-white bg-gradient-to-l from-[#2F292B] to-[#040102] rounded-full flex items-center justify-center">
          {children}
        </div>
      </div>
    </>
  );
};
