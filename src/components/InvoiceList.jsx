import React, { useState } from "react";
import { Plus, ChevronDown, ChevronRight } from "lucide-react";
import StatusBadge from "./StatusBadge.jsx";

const formatDate = (dateStr) => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return `${String(d.getDate()).padStart(2, "0")} ${months[d.getMonth()]} ${d.getFullYear()}`;
};

const formatCurrency = (amount) => {
  return `£ ${amount.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

const EMPTY_SVG = (
  <svg
    width="242"
    height="200"
    viewBox="0 0 242 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <ellipse cx="121" cy="183" rx="60" ry="10" fill="#9277FF" opacity="0.1" />
    <rect
      x="56"
      y="100"
      width="130"
      height="85"
      rx="4"
      fill="#F9FAFE"
      stroke="#DFE3FA"
      strokeWidth="1.5"
    />
    <rect
      x="56"
      y="100"
      width="130"
      height="85"
      rx="4"
      fill="url(#envelope)"
      opacity="0.6"
    />
    <polygon
      points="56,100 121,150 186,100"
      fill="#DFE3FA"
      stroke="#DFE3FA"
      strokeWidth="0.5"
    />
    <polygon points="56,185 100,145 56,145" fill="#DFE3FA" />
    <polygon points="186,185 142,145 186,145" fill="#DFE3FA" />
    <line x1="86" y1="125" x2="156" y2="125" stroke="#DFE3FA" strokeWidth="2" />
    <line x1="86" y1="135" x2="140" y2="135" stroke="#DFE3FA" strokeWidth="2" />
    {/* Person with megaphone */}
    <circle cx="121" cy="70" r="14" fill="#9277FF" opacity="0.15" />
    <circle cx="121" cy="55" r="10" fill="#9277FF" />
    <rect x="113" y="65" width="16" height="20" rx="4" fill="#9277FF" />
    <path d="M137 55 L150 45 L150 70 L137 65 Z" fill="#7C5CBF" />
    <rect x="150" y="50" width="6" height="18" rx="3" fill="#7C5CBF" />
    <defs>
      <linearGradient
        id="envelope"
        x1="56"
        y1="100"
        x2="186"
        y2="185"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#9277FF" stopOpacity="0.05" />
        <stop offset="1" stopColor="#9277FF" stopOpacity="0.15" />
      </linearGradient>
    </defs>
  </svg>
);

export default function InvoiceList({
  invoices,
  darkMode,
  onSelectInvoice,
  onNewInvoice,
}) {
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterOpen, setFilterOpen] = useState(false);

  const filterOptions = [
    { value: "all", label: "All" },
    { value: "draft", label: "Draft" },
    { value: "pending", label: "Pending" },
    { value: "paid", label: "Paid" },
  ];

  const filtered =
    filterStatus === "all"
      ? invoices
      : invoices.filter((inv) => inv.status === filterStatus);

  const bg = darkMode ? "hsl(233 30% 11%)" : "hsl(240 20% 96%)";
  const cardBg = darkMode ? "hsl(233 28% 16%)" : "#fff";
  const text = darkMode ? "hsl(240 20% 88%)" : "hsl(231 28% 22%)";
  const subText = darkMode ? "hsl(231 15% 52%)" : "hsl(231 15% 55%)";
  const borderColor = darkMode ? "hsl(233 28% 22%)" : "hsl(240 15% 88%)";
  const dropdownBg = darkMode ? "hsl(233 28% 20%)" : "#fff";

  return (
    <div
      style={{
        flex: 1,
        background: bg,
        minHeight: "100vh",
        padding: "64px 48px",
        overflowY: "auto",
        transition: "background 0.3s",
      }}
    >
      <div style={{ maxWidth: 730, margin: "0 auto" }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 40,
          }}
        >
          <div>
            <h1
              style={{
                fontSize: 32,
                fontWeight: 700,
                color: text,
                margin: 0,
                lineHeight: 1.2,
              }}
            >
              Invoices
            </h1>
            <p style={{ color: subText, fontSize: 13, margin: "4px 0 0 0" }}>
              {filtered.length === 0
                ? "No invoices"
                : `There are ${filtered.length} total invoice${filtered.length !== 1 ? "s" : ""}`}
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            {/* Filter */}
            <div style={{ position: "relative" }}>
              <button
                onClick={() => setFilterOpen(!filterOpen)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: text,
                  fontWeight: 700,
                  fontSize: 14,
                  padding: "8px 4px",
                }}
              >
                Filter by status
                <ChevronDown
                  size={14}
                  style={{
                    transform: filterOpen ? "rotate(180deg)" : "none",
                    transition: "0.2s",
                  }}
                />
              </button>
              {filterOpen && (
                <div
                  style={{
                    position: "absolute",
                    top: "110%",
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: dropdownBg,
                    borderRadius: 8,
                    padding: "16px 24px",
                    boxShadow: "0 10px 40px rgba(0,0,0,0.25)",
                    zIndex: 100,
                    minWidth: 160,
                  }}
                >
                  {filterOptions.map((opt) => (
                    <label
                      key={opt.value}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        cursor: "pointer",
                        padding: "6px 0",
                        color: text,
                        fontWeight: 700,
                        fontSize: 13,
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={filterStatus === opt.value}
                        onChange={() => {
                          setFilterStatus(opt.value);
                          setFilterOpen(false);
                        }}
                        style={{
                          accentColor: "#7C5DFA",
                          width: 14,
                          height: 14,
                          cursor: "pointer",
                        }}
                      />
                      {opt.label}
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* New Invoice button */}
            <button
              onClick={onNewInvoice}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                background: "#7C5DFA",
                color: "#fff",
                border: "none",
                borderRadius: 999,
                padding: "8px 16px 8px 8px",
                fontWeight: 700,
                fontSize: 14,
                cursor: "pointer",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#9277FF")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "#7C5DFA")
              }
            >
              <span
                style={{
                  background: "#fff",
                  borderRadius: "50%",
                  width: 32,
                  height: 32,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Plus size={16} color="#7C5DFA" />
              </span>
              New Invoice
            </button>
          </div>
        </div>

        {/* Empty state */}
        {filtered.length === 0 ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              paddingTop: 80,
              gap: 24,
            }}
          >
            {EMPTY_SVG}
            <h2
              style={{ color: text, fontSize: 20, fontWeight: 700, margin: 0 }}
            >
              There is nothing here
            </h2>
            <p
              style={{
                color: subText,
                fontSize: 13,
                textAlign: "center",
                margin: 0,
                maxWidth: 200,
                lineHeight: 1.8,
              }}
            >
              Create an invoice by clicking the{" "}
              <span style={{ color: text, fontWeight: 600 }}>New Invoice</span>{" "}
              button and get started
            </p>
          </div>
        ) : (
          /* Invoice list */
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {filtered.map((invoice) => (
              <button
                key={invoice.id}
                onClick={() => onSelectInvoice(invoice.id)}
                style={{
                  background: cardBg,
                  border: `1px solid ${borderColor}`,
                  borderRadius: 8,
                  padding: "20px 24px",
                  cursor: "pointer",
                  width: "100%",
                  textAlign: "left",
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  transition: "border-color 0.2s",
                  boxShadow: darkMode ? "none" : "0 2px 8px rgba(0,0,0,0.04)",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.borderColor = "#7C5DFA")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.borderColor = borderColor)
                }
              >
                {/* ID */}
                <span
                  style={{
                    fontWeight: 700,
                    color: text,
                    fontSize: 13,
                    minWidth: 72,
                  }}
                >
                  <span style={{ color: "#7C5DFA" }}>#</span>
                  {invoice.id}
                </span>

                {/* Due date */}
                <span
                  style={{
                    color: subText,
                    fontSize: 13,
                    minWidth: 120,
                  }}
                >
                  Due {formatDate(invoice.paymentDue)}
                </span>

                {/* Client name */}
                <span
                  style={{
                    color: subText,
                    fontSize: 13,
                    flex: 1,
                  }}
                >
                  {invoice.clientName}
                </span>

                {/* Amount */}
                <span
                  style={{
                    fontWeight: 700,
                    color: text,
                    fontSize: 16,
                    minWidth: 100,
                    textAlign: "right",
                  }}
                >
                  {formatCurrency(invoice.total)}
                </span>

                {/* Status */}
                <StatusBadge status={invoice.status} darkMode={darkMode} />

                {/* Arrow */}
                <ChevronRight
                  size={16}
                  color="#7C5DFA"
                  style={{ flexShrink: 0 }}
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
