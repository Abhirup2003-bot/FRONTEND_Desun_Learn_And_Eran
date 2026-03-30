import React from "react";
import { FaSignOutAlt } from "react-icons/fa";

const Button = ({ text, onClick, variant = "primary", icon }) => {
  const base =
    "flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 active:scale-95";

  const styles = {
    primary:
      "bg-blue-500 text-white hover:bg-blue-600 shadow-md hover:shadow-lg",

    success:
      "bg-[#82C600] text-white hover:bg-[#6ea800] shadow-md hover:shadow-lg",

    danger: "bg-red-500 text-white hover:bg-red-600 shadow-md hover:shadow-lg",

    outline: "border border-gray-300 text-gray-700 hover:bg-gray-100",

    ghost: "text-gray-700 hover:bg-gray-100",

    gradient:
      "bg-gradient-to-r from-[#82C600] to-green-500 text-white shadow-md hover:opacity-90",

    logout:
      "w-full flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50 rounded-lg",
  };

  return (
    <button className={`${base} ${styles[variant]}`} onClick={onClick}>
      {icon && icon}
      {text}
    </button>
  );
};

export default Button;
