import React from "react";

export default function FormInput({
  label,
  value,
  onChange,
  type = "text",
  placeholder = "",
  error = false,
  darkMode,
}) {
  return (
    <div className="mb-4">
      <label className="text-[hsl(231_15%_55%)] dark:text-[hsl(231_15%_52%)] text-xs block mb-2">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full bg-white dark:bg-[hsl(233_30%_11%)] border rounded p-3 text-[hsl(231_28%_22%)] dark:text-[hsl(240_20%_88%)] text-sm font-bold outline-none box-border font-inherit ${
          error
            ? "border-[#EC5757]"
            : "border-[hsl(240_15%_88%)] dark:border-[hsl(233_28%_28%)]"
        }`}
      />
    </div>
  );
}
