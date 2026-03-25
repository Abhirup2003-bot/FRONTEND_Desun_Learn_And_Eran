import React from "react";

const InputField = ({
  label,
  type,
  name,
  value,
  onChange,
  icon: Icon,
  iconEye: Icon2,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-gray-600">{label}</label>

      <div className="flex items-center border-white rounded-lg overflow-hidden bg-gray-50 focus-within:ring-2 focus-within:ring-green-500">
        {/* Icon Section */}
        <div className="w-10 h-10 rounded-full  text-gray-600  p-3 flex items-center justify-center ml-5">
          {Icon && <Icon size={18} />}
        </div>

        {/* Input */}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className="flex-1 p-3 outline-none bg-transparent"
        />
        <div className="pr-5">
          {type === "password" ? (
            <span>{Icon2 && <Icon2 size={18} />}</span>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default InputField;
