import React from "react";

const Button = ({ text, onClick, variant }) => {
  const buttonStyles = {
    primary:
      "bg-blue-500 hover:bg-blue-600 cursor-pointer rounded-xl px-4 py-2 text-white",
    secondary:
      "bg-gray-500 hover:bg-gray-600 cursor-pointer rounded-xl px-4 py-2 text-white",
    danger:
      "bg-red-500 hover:bg-red-600 cursor-pointer rounded-xl px-4 py-2 text-white",
    success:
      "bg-[#82C600] hover:bg-green-600 cursor-pointer rounded-xl px-4 py-2 text-white",
    signup:
      "bg-indigo-600 hover:bg-indigo-700 text-white text-sm  font-bold px-4  py-2.5  rounded-xl transition-all shadow-md hover:shadow-lg active:scale-95",
  };
  return (
    <>
      <button
        className={buttonStyles[variant] || buttonStyles.primary}
        onClick={onClick}
      >
        {text}
      </button>
    </>
  );
};

export default Button;
