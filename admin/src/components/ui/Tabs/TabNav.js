import React, { forwardRef } from "react";
import classNames from "classnames";
import { useTabs } from "./context";
import useCallbackRef from "../hooks/useCallbackRef";
import PropTypes from "prop-types";
import useThemeClass from "utils/hooks/useThemeClass";

const TabNav = forwardRef((props, ref) => {
  const {
    value: valueProp,
    disabled,
    className,
    icon,
    children,
    ...rest
  } = props;

  const { value, onValueChange, variant } = useTabs();
  const isSelected = valueProp === value;

  const { textTheme, bgTheme, borderTheme } = useThemeClass();

  const onTabNavClick = useCallbackRef(() => {
    if (!isSelected && !disabled) {
      onValueChange(valueProp);
    }
  });

  const tabNavClass = classNames(
    "tab-nav",
    `tab-nav-${variant}`,
    isSelected && `tab-nav-active ${textTheme}`,
    isSelected && variant === "underline" && `${borderTheme}`,
    isSelected &&
      variant === "pill" &&
      `${bgTheme} dark:${bgTheme} dark:text-gray-100`,
    disabled && "tab-nav-disabled",
    !disabled && !isSelected && `hover:${textTheme} dark:hover:${textTheme}`,
    className
  );

  return (
    <div
      className={tabNavClass}
      role="tab"
      aria-selected={isSelected}
      ref={ref}
      onClick={onTabNavClick}
      {...rest}
    >
      {icon && <div className="tab-nav-icon">{icon}</div>}
      {children}
    </div>
  );
});

TabNav.propTypes = {
  disabled: PropTypes.bool,
  value: PropTypes.string.isRequired,
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
};

export default TabNav;
