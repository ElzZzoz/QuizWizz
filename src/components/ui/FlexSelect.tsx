import React from "react";
import type { ChangeHandler } from "@/types/form.types"; // Adjust path if needed

interface FlexSelectProps {
  label: string;
  id: string;
  name: string;
  value: string;
  onChange: ChangeHandler;
  options: { label: string; value: string }[];
  className?: string;
  disabled?: boolean;
  isLoading?: boolean;
  isError?: boolean;
}

const FlexSelect: React.FC<FlexSelectProps> = ({
  label,
  id,
  name,
  value,
  onChange,
  options,
  className = "",
  disabled = false,
  isLoading = false,
  isError = false,
}) => (
  <div className={`flex items-center flex-1 ${className}`}>
    <div className="w-[100px] h-[38px] bg-[#FFEDDF] rounded flex items-center justify-center font-medium flex-shrink-0">
      {label}
    </div>
    <select
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled || isLoading || isError}
      className="flex-1 border rounded-[10px] h-[38px] p-2 min-w-0"
    >
      {isLoading && <option>Loading...</option>}
      {isError && <option>Error loading data</option>}

      {!isLoading &&
        !isError &&
        options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
    </select>
  </div>
);

export default FlexSelect;
