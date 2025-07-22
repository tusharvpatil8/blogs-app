import React from "react";

const Tab = ({ label, isActive, onClick }) => {
  return (
    <button
      className={`text-nowrap px-4 py-2 text-lg font-medium focus:outline-none ${
        isActive
          ? "text-[#003A7B] border-b-2 border-[#003A7B]"
          : "text-[#003A7B]"
      }`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Tab;
