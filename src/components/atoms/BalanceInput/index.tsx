import { ChangeEvent } from "react";
import { BalanceInputProps } from "./types";

export const BalanceInput = ({
  value,
  placeholder = "0.0",
  onUserInput,
  currencyValue,
  innerRef,
  inputProps,
  decimals = 18,
  unit,
  ...props
}: BalanceInputProps) => {
  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.validity.valid) {
      onUserInput(event.currentTarget.value.replace(/,/g, "."));
    }
  };

  return (
    <div {...props}>
      <input
        type="text"
        inputMode="decimal"
        min="0"
        value={value}
        pattern={`^[0-9]*[.,]?[0-9]{0,${decimals}}$`}
        onChange={handleOnChange}
        placeholder={placeholder}
        ref={innerRef}
        {...inputProps}
      />
      {unit && <div>{unit}</div>}
      {currencyValue && <div>~ {currencyValue}</div>}
    </div>
  );
};
