import React, { useState } from "react";

const InputField = ({
  label,
  type,
  name,
  value,
  onChange,
  icon: Icon,
  iconEye: Icon2,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-gray-600">{label}</label>

      <div className="flex items-center border-white rounded-lg overflow-hidden bg-gray-50 focus-within:ring-2 focus-within:ring-green-500">
        {/* Icon */}
        <div className="w-10 h-10 rounded-full text-gray-600 p-3 flex items-center justify-center ml-5">
          {Icon && <Icon size={18} />}
        </div>

        {/* Input */}
        <input
          type={type === "password" && showPassword ? "text" : type}
          name={name}
          value={value}
          onChange={onChange}
          className="flex-1 p-3 outline-none bg-transparent"
        />

        {/* Eye Icon */}
        <div className="pr-5 cursor-pointer">
          {type === "password" && Icon2 && (
            <span onClick={() => setShowPassword(!showPassword)}>
              <Icon2 size={18} />
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default InputField;
