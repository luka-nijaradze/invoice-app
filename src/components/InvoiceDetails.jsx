import React, { useState } from "react";
import { ChevronLeft } from "lucide-react";
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

export default function InvoiceDetail({
  invoice,
  darkMode,
  onGoBack,
  onEdit,
  onDelete,
  onMarkAsPaid,
}) {
  const bg = darkMode ? "hsl(233 30% 11%)" : "hsl(240 20% 96%)";
  const cardBg = darkMode ? "hsl(233 28% 16%)" : "#fff";
  const text = darkMode ? "hsl(240 20% 88%)" : "hsl(231 28% 22%)";
  const subText = darkMode ? "hsl(231 15% 52%)" : "hsl(231 15% 55%)";
  const borderColor = darkMode ? "hsl(233 28% 22%)" : "hsl(240 15% 88%)";
  const tableBg = darkMode ? "hsl(233 30% 20%)" : "hsl(240 20% 96%)";
  const totalBg = darkMode ? "hsl(233 32% 14%)" : "hsl(231 28% 22%)";

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
        {/* Go back */}
        <button
          onClick={onGoBack}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            background: "none",
            border: "none",
            cursor: "pointer",
            color: text,
            fontWeight: 700,
            fontSize: 14,
            padding: 0,
            marginBottom: 32,
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#9277FF")}
          onMouseLeave={(e) => (e.currentTarget.style.color = text)}
        >
          <ChevronLeft size={16} color="#7C5DFA" />
          Go back
        </button>

        {/* Status bar */}
        <div
          style={{
            background: cardBg,
            borderRadius: 8,
            padding: "20px 28px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 20,
            border: `1px solid ${borderColor}`,
            boxShadow: darkMode ? "none" : "0 2px 8px rgba(0,0,0,0.04)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span style={{ color: subText, fontSize: 13 }}>Status</span>
            <StatusBadge status={invoice.status} darkMode={darkMode} />
          </div>

          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={onEdit}
              style={{
                background: darkMode ? "hsl(233 28% 20%)" : "hsl(240 20% 96%)",
                color: darkMode ? "#DFE3FA" : "hsl(231 28% 22%)",
                border: "none",
                borderRadius: 999,
                padding: "12px 24px",
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
              Edit
            </button>
            <button
              onClick={onDelete}
              style={{
                background: "#EC5757",
                color: "#fff",
                border: "none",
                borderRadius: 999,
                padding: "12px 24px",
                fontWeight: 700,
                fontSize: 13,
                cursor: "pointer",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#FF9797")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "#EC5757")
              }
            >
              Delete
            </button>
            {invoice.status !== "paid" && (
              <button
                onClick={onMarkAsPaid}
                style={{
                  background: "#7C5DFA",
                  color: "#fff",
                  border: "none",
                  borderRadius: 999,
                  padding: "12px 24px",
                  fontWeight: 700,
                  fontSize: 13,
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
                Mark as Paid
              </button>
            )}
          </div>
        </div>

        {/* Invoice card */}
        <div
          style={{
            background: cardBg,
            borderRadius: 8,
            padding: "48px",
            border: `1px solid ${borderColor}`,
            boxShadow: darkMode ? "none" : "0 2px 8px rgba(0,0,0,0.04)",
          }}
        >
          {/* Top row: ID + address */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 40,
            }}
          >
            <div>
              <div
                style={{
                  fontWeight: 700,
                  fontSize: 16,
                  color: text,
                  marginBottom: 6,
                }}
              >
                <span style={{ color: "#7C5DFA" }}>#</span>
                {invoice.id}
              </div>
              <div style={{ color: subText, fontSize: 13 }}>
                {invoice.description}
              </div>
            </div>
            <div
              style={{
                textAlign: "right",
                color: subText,
                fontSize: 12,
                lineHeight: 1.8,
              }}
            >
              <div>{invoice.billFrom.street}</div>
              <div>{invoice.billFrom.city}</div>
              <div>{invoice.billFrom.postCode}</div>
              <div>{invoice.billFrom.country}</div>
            </div>
          </div>

          {/* Dates + Bill To + Sent To */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: 32,
              marginBottom: 40,
            }}
          >
            <div>
              <div style={{ marginBottom: 24 }}>
                <div style={{ color: subText, fontSize: 12, marginBottom: 8 }}>
                  Invoice Date
                </div>
                <div style={{ color: text, fontWeight: 700, fontSize: 15 }}>
                  {formatDate(invoice.invoiceDate)}
                </div>
              </div>
              <div>
                <div style={{ color: subText, fontSize: 12, marginBottom: 8 }}>
                  Payment Due
                </div>
                <div style={{ color: text, fontWeight: 700, fontSize: 15 }}>
                  {formatDate(invoice.paymentDue)}
                </div>
              </div>
            </div>

            <div>
              <div style={{ color: subText, fontSize: 12, marginBottom: 8 }}>
                Bill To
              </div>
              <div
                style={{
                  color: text,
                  fontWeight: 700,
                  fontSize: 15,
                  marginBottom: 8,
                }}
              >
                {invoice.billTo.name}
              </div>
              <div style={{ color: subText, fontSize: 12, lineHeight: 1.8 }}>
                <div>{invoice.billTo.street}</div>
                <div>{invoice.billTo.city}</div>
                <div>{invoice.billTo.postCode}</div>
                <div>{invoice.billTo.country}</div>
              </div>
            </div>

            <div>
              <div style={{ color: subText, fontSize: 12, marginBottom: 8 }}>
                Sent to
              </div>
              <div style={{ color: text, fontWeight: 700, fontSize: 15 }}>
                {invoice.billTo.email}
              </div>
            </div>
          </div>

          {/* Items table */}
          <div
            style={{
              background: tableBg,
              borderRadius: "8px 8px 0 0",
              overflow: "hidden",
            }}
          >
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th
                    style={{
                      padding: "16px 24px",
                      color: subText,
                      fontWeight: 500,
                      fontSize: 12,
                      textAlign: "left",
                    }}
                  >
                    Item Name
                  </th>
                  <th
                    style={{
                      padding: "16px 8px",
                      color: subText,
                      fontWeight: 500,
                      fontSize: 12,
                      textAlign: "center",
                    }}
                  >
                    QTY.
                  </th>
                  <th
                    style={{
                      padding: "16px 8px",
                      color: subText,
                      fontWeight: 500,
                      fontSize: 12,
                      textAlign: "right",
                    }}
                  >
                    Price
                  </th>
                  <th
                    style={{
                      padding: "16px 24px",
                      color: subText,
                      fontWeight: 500,
                      fontSize: 12,
                      textAlign: "right",
                    }}
                  >
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {invoice.items.map((item, i) => (
                  <tr key={i}>
                    <td
                      style={{
                        padding: "12px 24px",
                        color: text,
                        fontWeight: 700,
                        fontSize: 13,
                      }}
                    >
                      {item.name}
                    </td>
                    <td
                      style={{
                        padding: "12px 8px",
                        color: subText,
                        fontWeight: 700,
                        fontSize: 13,
                        textAlign: "center",
                      }}
                    >
                      {item.qty}
                    </td>
                    <td
                      style={{
                        padding: "12px 8px",
                        color: subText,
                        fontWeight: 700,
                        fontSize: 13,
                        textAlign: "right",
                      }}
                    >
                      {formatCurrency(item.price)}
                    </td>
                    <td
                      style={{
                        padding: "12px 24px",
                        color: text,
                        fontWeight: 700,
                        fontSize: 13,
                        textAlign: "right",
                      }}
                    >
                      {formatCurrency(item.total)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Total */}
            <div
              style={{
                background: totalBg,
                padding: "20px 24px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderRadius: "0 0 8px 8px",
              }}
            >
              <span style={{ color: "#fff", fontSize: 12 }}>Amount Due</span>
              <span style={{ color: "#fff", fontWeight: 700, fontSize: 24 }}>
                {formatCurrency(invoice.total)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
