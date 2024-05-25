import { useMemo, useCallback } from "react";
import CountUp from "react-countup";

interface BalancePorps {
  value: number;
  decimals?: number;
  unit?: string;
  isDIsabled?: boolean;
  prefix?: string;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

const formatNumber = new Intl.NumberFormat("en", {
  notation: "compact",
  minimumFractionDigits: 0,
}).format;

const formatStringNumber = (value: string | number) => {
  const number = Number(value);
  if (Number.isNaN(number)) {
    return String(value);
  }
  return String(formatNumber(number));
};

export const Balance = ({
  value,
  decimals = 3,
  unit,
  prefix,
  className,
  ...props
}: BalancePorps) => {
  const prefixProp = useMemo(() => (prefix ? { prefix } : {}), [prefix]);
  const suffixProp = useMemo(() => (unit ? { suffix: unit } : {}), [unit]);
  const formattingFn = useCallback(
    (val: number) =>
      (prefixProp.prefix ?? "") +
      formatStringNumber(val) +
      (suffixProp.suffix ?? ""),
    [prefixProp.prefix, suffixProp.suffix]
  );
  return (
    <CountUp
      start={0}
      preserveValue
      delay={0}
      end={value}
      decimals={decimals}
      duration={1}
      separator=","
      formattingFn={formattingFn}
    >
      {({ countUpRef }) => (
        <>
          <span className={className} ref={countUpRef} {...props} />
        </>
      )}
    </CountUp>
  );
};
