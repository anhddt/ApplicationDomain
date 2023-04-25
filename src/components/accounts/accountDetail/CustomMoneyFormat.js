import { forwardRef } from "react";
import { NumericFormat } from "react-number-format";

/**
 * A formatter that converts an input number to money format.
 * It also filters out extra commas, periods and other characters that are not numeric.
 * Used together with TextField
 */
const CustomMoneyFormat = forwardRef(function CustomMoneyFormat(
  props,
  inputRef
) {
  const { onChange, ...other } = props;
  return (
    <NumericFormat
      {...other}
      getInputRef={inputRef}
      thousandSeparator
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
    />
  );
});
export default CustomMoneyFormat;
