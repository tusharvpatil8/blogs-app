import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import ReactSelect from "react-select";
import tw, { theme } from "twin.macro";
import isEmpty from "lodash/isEmpty";
import get from "lodash/get";
import { useConfig } from "../configProvider";
import { useForm } from "../form/context";
import { useInputGroup } from "../inputGroup/context";
import { HiCheck, HiChevronDown, HiX } from "react-icons/hi";
import Spinner from "../spinner";
import { CONTROL_SIZES, SIZES } from "../utils/constant";

const DefaultOption = ({
  innerProps,
  label,
  selectProps,
  isSelected,
  isDisabled,
}) => {
  // console.log("🚀 ~ isSelected:", isSelected)
  const { themeColor } = selectProps;
  let optionColor = isSelected ? '[#003A7B]' : '[#333333]'; 
  return (
    <div
      className={`flex items-center justify-between  px-2 py-1.5 hover:bg-gray-200 cursor-default select-option ${isSelected && "selected"} ${
        isDisabled && "disabled"
      }`}
      {...innerProps}
    >
      <span className={`ml-2 text-${optionColor}`}>{label}</span>
      {isSelected && (
        <HiCheck color="#003A7B" className={`text-${themeColor} dark:text-white text-xl`} />
      )}
    </div>
  );
};

const DefaultDropdownIndicator = () => {
  return (
    <div className="select-dropdown-indicator">
      <HiChevronDown />
    </div>
  );
};

const DefaultClearIndicator = (props) => {
  const {
    innerProps: { ref, ...restInnerProps },
  } = props;
  return (
    <div {...restInnerProps} ref={ref}>
      <div className="select-clear-indicator">
        <HiX />
      </div>
    </div>
  );
};

const DefaultLoadingIndicator = ({ selectProps }) => {
  const { themeColor } = selectProps;
  return <Spinner className={`select-loading-indicatior text-${themeColor}`} />;
};

const Select = React.forwardRef((props, ref) => {
  const {
    prefixIcon,
    size,
    style,
    className,
    form,
    field,
    components,
    componentAs: Component,
    ...rest
  } = props;

  const { controlSize } = useConfig();
  const formControlSize = useForm()?.size;
  const inputGroupSize = useInputGroup()?.size;

  const selectSize = size || inputGroupSize || formControlSize || controlSize;

  const twColor = theme`colors`;
  const twHeight = theme`height`;

  let isInvalid = false;

  if (!isEmpty(form)) {
    const { touched, errors } = form;

    const touchedField = get(touched, field.name);
    const errorField = get(errors, field.name);

    isInvalid = touchedField && errorField;
  }

  const getBoxShadow = (state) => {
    const shadaowBase = "0 0 0 1px ";

    if (isInvalid) {
      return shadaowBase + twColor.red["500"];
    }

    if (state?.isFocused) {
      return shadaowBase + twColor["#00000"];
    }

    return "none";
  };
  const getBorderColor = (state) => {
    if (state?.isFocused) {
      return "#003A7B";
    }

    return "gray";
  }
  // styles={{
  //   control: (baseStyles) => ({
  //     ...baseStyles,
  //     border: 0,
      
  //     borderRadius: "8px",
  //     height: "46px",
  //     boxShadow: "none",
  //     minWidth: "167px",
  //   }),
  //   menu: (styles) => ({
  //     ...styles,
  //     // color: "#5A6DD8",
  //     color: "#0E0D0D",
  //     backgroundColor: "#fff",
  //     borderRadius: "8px",
  //   }),
  // }}
  const styles = {
    control: (provided, state) => {
      return {
        ...provided,
        height: twHeight[CONTROL_SIZES[selectSize]],
        minHeight: twHeight[CONTROL_SIZES[selectSize]],
        "&:hover": {
          boxShadow: getBoxShadow(state),
          cursor: "pointer",
        },
        boxShadow: getBoxShadow(state),
        borderColor:  getBorderColor(state),
        borderRadius: tw`rounded-md`.borderRadius,
        ...(isInvalid ? { borderColor: twColor.red["500"] } : {}),
      };
    },
    input: (css) => {
      return {
        ...css,
        input: {
          outline: "none",
          outlineOffset: 0,
          boxShadow: "none !important",
        },
      };
    },
    menu: (provided) => ({ ...provided, zIndex: 50 }),
    ...style,
  };

  const selectClass = classNames("select", `select-${selectSize}`, className);

  return (
    <>
      {prefixIcon && <div>{prefixIcon}</div>}
      <Component
        className={selectClass}
        classNamePrefix={"select"}
        ref={ref}
        styles={styles}
        themeColor={`[#FF0000]`}
        components={{
          IndicatorSeparator: () => null,
          Option: DefaultOption,
          LoadingIndicator: DefaultLoadingIndicator,
          DropdownIndicator: DefaultDropdownIndicator,
          ClearIndicator: DefaultClearIndicator,
          ...components,
        }}
        {...field}
        {...rest}
      />
    </>
  );
});

Select.propTypes = {
  size: PropTypes.oneOf([SIZES.LG, SIZES.MD, SIZES.SM]),
  componentAs: PropTypes.elementType,
};

Select.defaultProps = {
  componentAs: ReactSelect,
};

export default Select;
