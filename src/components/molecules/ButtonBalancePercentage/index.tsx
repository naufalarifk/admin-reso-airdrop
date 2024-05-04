interface BalanceButtonProps {
  value: string;
  onClick: () => void;
  isActive: boolean;
}

export const BalanceButtons = ({
  value,
  onClick,
  isActive,
}: BalanceButtonProps) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className={`${
        isActive ? "bg-primary text-white" : "bg-[#5D636F1A] text-soft"
      } rounded-full w-full text-xs font-medium  py-1 px-2.5 text-center`}
    >
      {value}
    </button>
  );
};
