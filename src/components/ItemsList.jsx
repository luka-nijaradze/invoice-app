import React from "react";
import { Trash2 } from "lucide-react";

export default function ItemsList({
  items,
  onUpdateItem,
  onRemoveItem,
  onAddItem,
  errors,
  darkMode,
}) {
  const text = darkMode ? "hsl(240 20% 88%)" : "hsl(231 28% 22%)";
  const subText = darkMode ? "hsl(231 15% 52%)" : "hsl(231 15% 55%)";
  const inputBg = darkMode ? "hsl(233 30% 11%)" : "#fff";
  const inputBorder = darkMode ? "hsl(233 28% 28%)" : "hsl(240 15% 88%)";

  const inputStyle = (err) => ({
    width: "100%",
    background: inputBg,
    border: `1px solid ${err ? "#EC5757" : inputBorder}`,
    borderRadius: 4,
    padding: "12px 16px",
    color: text,
    fontSize: 13,
    fontWeight: 700,
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "inherit",
  });

  return (
    <div>
      <div
        style={{
          color: "#7C5DFA",
          fontWeight: 700,
          fontSize: 13,
          marginBottom: 16,
        }}
      >
        Item List
      </div>

      {items.length > 0 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 56px 80px 80px 24px",
            gap: 12,
            marginBottom: 8,
          }}
        >
          <span style={{ color: subText, fontSize: 12 }}>Item Name</span>
          <span style={{ color: subText, fontSize: 12 }}>Qty.</span>
          <span style={{ color: subText, fontSize: 12 }}>Price</span>
          <span style={{ color: subText, fontSize: 12 }}>Total</span>
          <span />
        </div>
      )}

      {items.map((item, i) => (
        <div
          key={i}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 56px 80px 80px 24px",
            gap: 12,
            marginBottom: 16,
            alignItems: "center",
          }}
        >
          <input
            style={inputStyle(errors[`item_name_${i}`])}
            value={item.name}
            onChange={(e) => onUpdateItem(i, "name", e.target.value)}
            placeholder="Item name"
          />
          <input
            type="number"
            style={{ ...inputStyle(false), textAlign: "center" }}
            value={item.qty}
            onChange={(e) => onUpdateItem(i, "qty", e.target.value)}
            min="1"
          />
          <input
            type="number"
            style={inputStyle(false)}
            value={item.price}
            onChange={(e) => onUpdateItem(i, "price", e.target.value)}
            step="0.01"
          />
          <span
            style={{
              color: subText,
              fontWeight: 700,
              fontSize: 13,
              paddingTop: 4,
            }}
          >
            {((Number(item.qty) || 0) * (Number(item.price) || 0)).toFixed(2)}
          </span>
          <button
            onClick={() => onRemoveItem(i)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#EC5757",
              fontSize: 0,
            }}
          >
            <Trash2 size={16} />
          </button>
        </div>
      ))}

      <button
        onClick={onAddItem}
        style={{
          width: "100%",
          background: darkMode ? "hsl(233 28% 20%)" : "hsl(240 20% 96%)",
          color: "#7C5DFA",
          border: "none",
          borderRadius: 4,
          padding: "12px 16px",
          fontWeight: 700,
          fontSize: 13,
          cursor: "pointer",
          marginTop: 16,
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
        + Add Item
      </button>
    </div>
  );
}
