import React from "react";

export default function DeleteModal({
  invoiceId,
  darkMode,
  onCancel,
  onConfirm,
}) {
  const modalBg = darkMode ? "hsl(233 28% 16%)" : "#fff";
  const text = darkMode ? "hsl(240 20% 88%)" : "hsl(231 28% 22%)";
  const subText = darkMode ? "hsl(231 15% 52%)" : "hsl(231 15% 55%)";

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 2000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0,0,0,0.5)",
      }}
    >
      <div
        style={{
          background: modalBg,
          borderRadius: 8,
          padding: "48px",
          maxWidth: 480,
          width: "90%",
          boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2
          style={{
            color: text,
            fontSize: 24,
            fontWeight: 700,
            marginBottom: 16,
          }}
        >
          Confirm Deletion
        </h2>
        <p
          style={{
            color: subText,
            fontSize: 13,
            lineHeight: 1.8,
            marginBottom: 32,
          }}
        >
          Are you sure you want to delete invoice #{invoiceId}? This action
          cannot be undone.
        </p>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
          <button
            onClick={onCancel}
            style={{
              background: darkMode ? "hsl(233 28% 20%)" : "hsl(240 20% 96%)",
              color: darkMode ? "#DFE3FA" : "#7E88C3",
              border: "none",
              borderRadius: 999,
              padding: "14px 24px",
              fontWeight: 700,
              fontSize: 13,
              cursor: "pointer",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = darkMode
                ? "hsl(233 28% 26%)"
                : "hsl(240 20% 90%)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = darkMode
                ? "hsl(233 28% 20%)"
                : "hsl(240 20% 96%)")
            }
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            style={{
              background: "#EC5757",
              color: "#fff",
              border: "none",
              borderRadius: 999,
              padding: "14px 24px",
              fontWeight: 700,
              fontSize: 13,
              cursor: "pointer",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#FF9797")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#EC5757")}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
