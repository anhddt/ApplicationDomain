import { forwardRef } from "react";
import { NumericFormat } from "react-number-format";

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
