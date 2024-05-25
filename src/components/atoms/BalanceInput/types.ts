import { RefObject, ReactNode, InputHTMLAttributes } from "react";

export interface BalanceInputProps {
  value: number | string;
  onUserInput: (input: string) => void;
  innerRef?: RefObject<HTMLInputElement>;
  currencyValue?: ReactNode;
  placeholder?: string;
  inputProps?: Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "value" | "placeholder" | "onChange"
  >;
  isWarning?: boolean;
  decimals?: number;
  unit?: string;
  switchEditingUnits?: () => void;
}
