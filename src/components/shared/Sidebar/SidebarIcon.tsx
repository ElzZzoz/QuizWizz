import type { JSX } from "react";

export const renderIcon = (icon: JSX.Element, isActive: boolean) => {
  const outerClasses = [
    "flex items-center justify-center",
    "w-[45px] h-[45px] rounded-[10px]",
    "transition-colors transition-shadow transition-transform duration-500 ease-in-out",
    isActive ? "bg-black shadow-md" : "bg-[#FFEDDF]",
    "hover:scale-105",
  ].join(" ");

  const innerClasses = [
    "text-xl transform transition-colors transition-transform duration-500 ease-in-out",
    isActive ? "text-white scale-105" : "text-black scale-100",
  ].join(" ");

  return (
    <div className={outerClasses}>
      <div className={innerClasses}>{icon}</div>
    </div>
  );
};
