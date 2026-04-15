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
  const subText = darkMode ? "hsl(231 15% 52%)" : "hsl(231 15% 55%)";
  const text = darkMode ? "hsl(240 20% 88%)" : "hsl(231 28% 22%)";
  const inputBg = darkMode ? "hsl(233 30% 11%)" : "#fff";
  const inputBorder = darkMode ? "hsl(233 28% 28%)" : "hsl(240 15% 88%)";

  return (
    <div style={{ marginBottom: 16 }}>
      <label
        style={{
          color: subText,
          fontSize: 12,
          display: "block",
          marginBottom: 8,
        }}
      >
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: "100%",
          background: inputBg,
          border: `1px solid ${error ? "#EC5757" : inputBorder}`,
          borderRadius: 4,
          padding: "12px 16px",
          color: text,
          fontSize: 13,
          fontWeight: 700,
          outline: "none",
          boxSizing: "border-box",
          fontFamily: "inherit",
        }}
      />
    </div>
  );
}
