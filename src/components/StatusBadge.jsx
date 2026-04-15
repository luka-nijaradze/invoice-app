import React from "react";

const statusConfig = {
  paid: {
    label: "Paid",
    dot: "#33D69F",
    bg: "rgba(51, 214, 159, 0.08)",
    color: "#33D69F",
  },
  pending: {
    label: "Pending",
    dot: "#FF8F00",
    bg: "rgba(255, 143, 0, 0.08)",
    color: "#FF8F00",
  },
  draft: {
    label: "Draft",
    dot: "#373B53",
    bg: "rgba(55, 59, 83, 0.08)",
    color: "#373B53",
  },
};

const statusConfigDark = {
  paid: statusConfig.paid,
  pending: statusConfig.pending,
  draft: {
    label: "Draft",
    dot: "#DFE3FA",
    bg: "rgba(223, 227, 250, 0.08)",
    color: "#DFE3FA",
  },
};

export default function StatusBadge({ status, darkMode }) {
  const cfg = darkMode ? statusConfigDark[status] : statusConfig[status];
  if (!cfg) return null;

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        background: cfg.bg,
        color: cfg.color,
        padding: "6px 16px",
        borderRadius: 6,
        fontWeight: 700,
        fontSize: 12,
        minWidth: 104,
        justifyContent: "center",
      }}
    >
      <span
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: cfg.dot,
          display: "inline-block",
          flexShrink: 0,
        }}
      />
      {cfg.label}
    </span>
  );
}
