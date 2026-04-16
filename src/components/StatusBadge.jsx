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
      className={`inline-flex items-center gap-2 px-4 py-1.5 rounded font-bold text-xs ${
        status === "paid"
          ? "bg-[rgba(51,214,159,0.08)] text-[#33D69F]"
          : status === "pending"
            ? "bg-[rgba(255,143,0,0.08)] text-[#FF8F00]"
            : darkMode
              ? "bg-[rgba(223,227,250,0.08)] text-[#DFE3FA]"
              : "bg-[rgba(55,59,83,0.08)] text-[#373B53]"
      }`}
    >
      <div
        className="w-2 h-2 rounded-full"
        style={{ background: cfg.dot }}
      ></div>
      {cfg.label}
    </span>
  );
}
