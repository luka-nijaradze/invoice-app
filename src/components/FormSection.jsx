import React from "react";

export default function FormSection({ title, children, darkMode }) {
  return (
    <div className="mb-8">
      <div className="text-[#7C5DFA] font-bold text-sm mb-4">{title}</div>
      {children}
    </div>
  );
}
