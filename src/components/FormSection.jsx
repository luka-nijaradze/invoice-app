import React from "react";

export default function FormSection({ title, children, darkMode }) {
  const labelColor = "#7C5DFA";

  return (
    <div style={{ marginBottom: 32 }}>
      <div
        style={{
          color: labelColor,
          fontWeight: 700,
          fontSize: 13,
          marginBottom: 16,
        }}
      >
        {title}
      </div>
      {children}
    </div>
  );
}
