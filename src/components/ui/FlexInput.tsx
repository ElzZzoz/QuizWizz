import React from "react";
import type { ChangeHandler } from "@/types/form.types"; // Adjust path if needed

interface FlexInputProps {
  label: string;
  id: string;
  name: string;
  type: string;
  value: string | number;
  onChange: ChangeHandler;
  className?: string;
}

const FlexInput: React.FC<FlexInputProps> = ({
  label,
  id,
  name,
  type,
  value,
  onChange,
  className = "",
}) => (
  <div className={`flex items-center ${className}`}>
    <div className="w-[100px] h-[38px] bg-[#FFEDDF] rounded flex items-center justify-center font-medium flex-shrink-0">
      {label}
    </div>
    <input
      id={id}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      className="flex-1 border rounded-[10px] h-[38px] p-2 min-w-0"
      required
    />
  </div>
);

export default FlexInput;
