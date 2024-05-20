import React, { useState } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";
import { useTheme } from "next-themes";

const ButtonTheme = () => {
  const { theme, setTheme } = useTheme();
  const [enabled, setEnabled] = useState(false);
  const handleCheckboxChange = () => {
    enabled ? setTheme("dark") : setTheme("light");
    setEnabled(!enabled);
  };

  return (
    <div
      className={`relative inline-flex items-center rounded-full p-1 cursor-pointer ${
        enabled ? "bg-yellow-900" : "bg-indigo-950"
      }`}
      onClick={handleCheckboxChange}
    >
      <div className="w-12">
        <div
          className={` h-6 w-6 rounded-full bg-white flex items-center justify-center transition-transform duration-300 ${
            enabled ? "translate-x-6" : "translate-x-0"
          }`}
        >
          {enabled ? (
            <SunIcon className="h-4 w-4 text-yellow-500" />
          ) : (
            <MoonIcon className="h-4 w-4 text-gray-500" />
          )}
        </div>
      </div>
    </div>
  );
};

export default ButtonTheme;
