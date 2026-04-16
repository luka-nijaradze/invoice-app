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
  return (
    <div className="flex-1 bg-[hsl(240_20%_96%)] dark:bg-[hsl(233_30%_11%)] min-h-screen p-16 overflow-y-auto transition-colors">
      <div className="max-w-[730px] mx-auto">
        <button
          onClick={onGoBack}
          className="flex items-center gap-3 bg-none border-none cursor-pointer text-[hsl(231_28%_22%)] dark:text-[hsl(240_20%_88%)] font-bold text-sm p-0 mb-8 transition-colors hover:text-[#9277FF]"
        >
          <ChevronLeft size={16} color="#7C5DFA" />
          Go back
        </button>

        <div className="bg-white dark:bg-[hsl(233_28%_16%)] rounded-lg p-5 flex items-center justify-between mb-5 border border-[hsl(240_15%_88%)] dark:border-[hsl(233_28%_22%)]">
          <div className="flex items-center gap-4">
            <span className="text-[hsl(231_15%_55%)] dark:text-[hsl(231_15%_52%)] text-sm">
              Status
            </span>
            <StatusBadge status={invoice.status} darkMode={darkMode} />
          </div>

          <div className="flex gap-2">
            <button
              onClick={onEdit}
              className="bg-[hsl(240_20%_96%)] dark:bg-[hsl(233_28%_20%)] text-[hsl(231_28%_22%)] dark:text-[#DFE3FA] border-none rounded-full p-3 font-bold text-sm cursor-pointer transition-colors hover:bg-[hsl(240_20%_90%)] dark:hover:bg-[hsl(233_28%_26%)]"
            >
              Edit
            </button>
            <button
              onClick={onDelete}
              className="bg-[#EC5757] text-white border-none rounded-full p-3 font-bold text-sm cursor-pointer transition-colors hover:bg-[#FF9797]"
            >
              Delete
            </button>
            {invoice.status !== "paid" && (
              <button
                onClick={onMarkAsPaid}
                className="bg-[#7C5DFA] text-white border-none rounded-full p-3 font-bold text-sm cursor-pointer transition-colors hover:bg-[#9277FF]"
              >
                Mark as Paid
              </button>
            )}
          </div>
        </div>

        <div className="bg-white dark:bg-[hsl(233_28%_16%)] rounded-lg p-12 border border-[hsl(240_15%_88%)] dark:border-[hsl(233_28%_22%)]">
          <div className="flex justify-between mb-10">
            <div>
              <div className="font-bold text-base text-[hsl(231_28%_22%)] dark:text-[hsl(240_20%_88%)] mb-1.5">
                <span className="text-[#7C5DFA]">#</span>
                {invoice.id}
              </div>
              <div className="text-[hsl(231_15%_55%)] dark:text-[hsl(231_15%_52%)] text-sm">
                {invoice.description}
              </div>
            </div>
            <div className="text-right text-[hsl(231_15%_55%)] dark:text-[hsl(231_15%_52%)] text-xs leading-relaxed">
              <div>{invoice.billFrom.street}</div>
              <div>{invoice.billFrom.city}</div>
              <div>{invoice.billFrom.postCode}</div>
              <div>{invoice.billFrom.country}</div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-8 mb-10">
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
