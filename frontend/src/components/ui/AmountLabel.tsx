import { NumericFormat } from "react-number-format";

type Props = {
  value: number;
  thousandSeparator?: string;
  decimalSeparator?: string;
  prefix?: string;
  decimalScale?: number;
};
function AmountLabel({
  value,
  thousandSeparator = ".",
  decimalSeparator = ",",
  prefix = "Gs ",
  decimalScale = 0,
}: Props) {
  return (
    <label className="text-light">
      <NumericFormat
        value={value}
        displayType="text"
        thousandSeparator={thousandSeparator}
        decimalSeparator={decimalSeparator}
        prefix={prefix}
        decimalScale={decimalScale}
        fixedDecimalScale
      />
    </label>
  );
}

export default AmountLabel;
