import React from "react";
import Select from "react-select";

const SelectWithIcon = ({name, value, options, icon, placeholder, onChange, ...rest }) => {
  return (
    <>
      <div className=" font-outfit bg-white flex justify-start items-center w-full cursor-pointer  ">
        <div
          className={`flex relative  items-center w-full h-[56px] text-base rounded-lg outline-none px-2 border-[#003A7B] active:border-accessiblePurple focus:border-accessiblePurple border border-dark cursor-pointer`}
        >
          {icon && <div className="mr-[13px] absolute cursor-pointer ">{icon}</div>}

          <Select
            {...rest}
            name={name}
            value={value}
            onChange={onChange}
            options={options}
            placeholder={placeholder}
            className={`font-outfit w-full text-[14px] text-start ml-8  rounded-lg cursor-pointer`}
            components={{
              IndicatorSeparator: () => null,
            }}
            theme={(theme) => ({
              ...theme,
              colors: {
                ...theme.colors,
                primary25: "#8390F520",
                primary: "#5A6DD8",
                border: 0,
                 cursor: "pointer"
              },
            })}
            styles={{
              control: (baseStyles) => ({
                ...baseStyles,
                border: "none",
                borderColor: "#0E0D0D",
                borderRadius: "8px",
                boxShadow: "none",
                cursor: "pointer"
              }),
              menu: (styles) => ({
                ...styles,
                padding: "10px",
                color: "#0E0D0D",
                backgroundColor: "#fff",
                borderRadius: "8px",
                cursor: "pointer"
              }),
              menuList: (styles) => ({
                ...styles,
                border: 1,
                borderColor: "#0E0D0D",
                width: "100%",
                maxHeight: "300px",
                borderRadius: "8px",
                cursor: "pointer"
              }),
            }}
          />
        </div>
      </div>
    </>
  );
};

export default SelectWithIcon;
