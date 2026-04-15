import React, { useState } from "react";
import FormInput from "./FormInput.jsx";
import FormSection from "./FormSection.jsx";
import ItemsList from "./ItemsList.jsx";

const PAYMENT_TERMS = ["Net 1 Day", "Net 7 Days", "Net 14 Days", "Net 30 Days"];

const genId = () => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const l1 = letters[Math.floor(Math.random() * 26)];
  const l2 = letters[Math.floor(Math.random() * 26)];
  const num = String(Math.floor(Math.random() * 9000) + 1000);
  return `${l1}${l2}${num}`;
};

const calcTotal = (items) =>
  items.reduce(
    (sum, it) => sum + (Number(it.qty) || 0) * (Number(it.price) || 0),
    0,
  );

const defaultItem = () => ({ name: "", qty: 1, price: 0, total: 0 });

export default function InvoiceForm({
  invoice,
  darkMode,
  open,
  onClose,
  onSave,
  onSaveDraft,
}) {
  const isEdit = !!invoice;

  const [form, setForm] = useState(() => ({
    billFrom: invoice?.billFrom || {
      street: "",
      city: "",
      postCode: "",
      country: "",
    },
    billTo: invoice?.billTo || {
      name: "",
      email: "",
      street: "",
      city: "",
      postCode: "",
      country: "",
    },
    invoiceDate: invoice?.invoiceDate || new Date().toISOString().split("T")[0],
    paymentTerms: invoice?.paymentTerms || "Net 30 Days",
    description: invoice?.description || "",
    items: invoice?.items?.length
      ? invoice.items.map((i) => ({ ...i }))
      : [defaultItem()],
  }));

  const [errors, setErrors] = useState({});

  const updateBillFrom = (field, val) =>
    setForm((f) => ({ ...f, billFrom: { ...f.billFrom, [field]: val } }));

  const updateBillTo = (field, val) =>
    setForm((f) => ({ ...f, billTo: { ...f.billTo, [field]: val } }));

  const addItem = () =>
    setForm((f) => ({ ...f, items: [...f.items, defaultItem()] }));

  const removeItem = (i) =>
    setForm((f) => ({ ...f, items: f.items.filter((_, idx) => idx !== i) }));

  const updateItem = (i, field, val) => {
    setForm((f) => {
      const items = f.items.map((it, idx) => {
        if (idx !== i) return it;
        const updated = { ...it, [field]: val };
        updated.total =
          (Number(updated.qty) || 0) * (Number(updated.price) || 0);
        return updated;
      });
      return { ...f, items };
    });
  };

  const computeDueDate = (dateStr, terms) => {
    const days =
      terms === "Net 1 Day"
        ? 1
        : terms === "Net 7 Days"
          ? 7
          : terms === "Net 14 Days"
            ? 14
            : 30;
    const d = new Date(dateStr);
    d.setDate(d.getDate() + days);
    return d.toISOString().split("T")[0];
  };

  const validate = () => {
    const errs = {};
    if (!form.billFrom.street) errs.fromStreet = true;
    if (!form.billFrom.city) errs.fromCity = true;
    if (!form.billFrom.postCode) errs.fromPostCode = true;
    if (!form.billFrom.country) errs.fromCountry = true;
    if (!form.billTo.name) errs.toName = true;
    if (!form.billTo.email) errs.toEmail = true;
    if (!form.billTo.street) errs.toStreet = true;
    if (!form.billTo.city) errs.toCity = true;
    if (!form.billTo.postCode) errs.toPostCode = true;
    if (!form.billTo.country) errs.toCountry = true;
    if (!form.description) errs.description = true;
    if (form.items.length === 0) errs.items = true;
    form.items.forEach((it, i) => {
      if (!it.name) errs[`item_name_${i}`] = true;
    });
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSend = () => {
    if (!validate()) return;
    const total = calcTotal(form.items);
    const paymentDue = computeDueDate(form.invoiceDate, form.paymentTerms);
    onSave({
      id: invoice?.id || genId(),
      ...form,
      clientName: form.billTo.name,
      clientEmail: form.billTo.email,
      paymentDue,
      status: "pending",
      total,
      items: form.items.map((it) => ({
        ...it,
        qty: Number(it.qty),
        price: Number(it.price),
        total: Number(it.qty) * Number(it.price),
      })),
    });
  };

  const handleDraft = () => {
    const total = calcTotal(form.items);
    const paymentDue = computeDueDate(form.invoiceDate, form.paymentTerms);
    onSaveDraft?.({
      id: invoice?.id || genId(),
      ...form,
      clientName: form.billTo.name,
      clientEmail: form.billTo.email,
      paymentDue,
      status: "draft",
      total,
      items: form.items.map((it) => ({
        ...it,
        qty: Number(it.qty),
        price: Number(it.price),
        total: Number(it.qty) * Number(it.price),
      })),
    });
  };

  const overlayBg = "rgba(0,0,0,0.5)";
  const modalBg = darkMode ? "hsl(233 28% 16%)" : "#fff";
  const text = darkMode ? "hsl(240 20% 88%)" : "hsl(231 28% 22%)";
  const subText = darkMode ? "hsl(231 15% 52%)" : "hsl(231 15% 55%)";

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        display: "flex",
        pointerEvents: open ? "auto" : "none",
      }}
    >
      {/* Overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 103,
          right: 0,
          bottom: 0,
          background: overlayBg,
          opacity: open ? 1 : 0,
          transition: "opacity 0.25s ease",
          pointerEvents: open ? "auto" : "none",
        }}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 103,
          zIndex: 1001,
          background: modalBg,
          width: 616,
          maxWidth: "calc(100vw - 103px)",
          height: "100%",
          overflowY: "auto",
          padding: "56px 56px 40px",
          borderRadius: "0 20px 20px 0",
          display: "flex",
          flexDirection: "column",
          gap: 0,
          transform: open ? "translateX(0)" : "translateX(-105%)",
          transition: "transform 0.32s cubic-bezier(0.22, 1, 0.36, 1)",
          boxShadow: "0 36px 80px rgba(15, 23, 42, 0.18)",
          willChange: "transform",
          opacity: open ? 1 : 0.96,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2
          style={{
            color: text,
            fontSize: 24,
            fontWeight: 700,
            marginBottom: 32,
          }}
        >
          {isEdit ? `Edit #${invoice.id}` : "New Invoice"}
        </h2>

        <div style={{ flex: 1 }}>
          <FormSection title="Bill From" darkMode={darkMode}>
            <FormInput
              label="Street Address"
              value={form.billFrom.street}
              onChange={(val) => updateBillFrom("street", val)}
              error={errors.fromStreet}
              darkMode={darkMode}
            />
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: 16,
              }}
            >
              <FormInput
                label="City"
                value={form.billFrom.city}
                onChange={(val) => updateBillFrom("city", val)}
                error={errors.fromCity}
                darkMode={darkMode}
              />
              <FormInput
                label="Post Code"
                value={form.billFrom.postCode}
                onChange={(val) => updateBillFrom("postCode", val)}
                error={errors.fromPostCode}
                darkMode={darkMode}
              />
              <FormInput
                label="Country"
                value={form.billFrom.country}
                onChange={(val) => updateBillFrom("country", val)}
                error={errors.fromCountry}
                darkMode={darkMode}
              />
            </div>
          </FormSection>

          <FormSection title="Bill To" darkMode={darkMode}>
            <FormInput
              label="Client's Name"
              value={form.billTo.name}
              onChange={(val) => updateBillTo("name", val)}
              error={errors.toName}
              darkMode={darkMode}
            />
            <FormInput
              label="Client's Email"
              value={form.billTo.email}
              onChange={(val) => updateBillTo("email", val)}
              error={errors.toEmail}
              placeholder="e.g. email@example.com"
              darkMode={darkMode}
            />
            <FormInput
              label="Street Address"
              value={form.billTo.street}
              onChange={(val) => updateBillTo("street", val)}
              error={errors.toStreet}
              darkMode={darkMode}
            />
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: 16,
              }}
            >
              <FormInput
                label="City"
                value={form.billTo.city}
                onChange={(val) => updateBillTo("city", val)}
                error={errors.toCity}
                darkMode={darkMode}
              />
              <FormInput
                label="Post Code"
                value={form.billTo.postCode}
                onChange={(val) => updateBillTo("postCode", val)}
                error={errors.toPostCode}
                darkMode={darkMode}
              />
              <FormInput
                label="Country"
                value={form.billTo.country}
                onChange={(val) => updateBillTo("country", val)}
                error={errors.toCountry}
                darkMode={darkMode}
              />
            </div>
          </FormSection>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 16,
              marginBottom: 32,
            }}
          >
            <FormInput
              label="Invoice Date"
              type="date"
              value={form.invoiceDate}
              onChange={(val) => setForm((f) => ({ ...f, invoiceDate: val }))}
              darkMode={darkMode}
            />
            <div style={{ marginBottom: 0 }}>
              <label
                style={{
                  color: subText,
                  fontSize: 12,
                  display: "block",
                  marginBottom: 8,
                }}
              >
                Payment Terms
              </label>
              <select
                value={form.paymentTerms}
                onChange={(e) =>
                  setForm((f) => ({ ...f, paymentTerms: e.target.value }))
                }
                style={{
                  width: "100%",
                  background: darkMode ? "hsl(233 30% 11%)" : "#fff",
                  border: `1px solid ${
                    darkMode ? "hsl(233 28% 28%)" : "hsl(240 15% 88%)"
                  }`,
                  borderRadius: 4,
                  padding: "12px 16px",
                  color: text,
                  fontSize: 13,
                  fontWeight: 700,
                  outline: "none",
                  cursor: "pointer",
                }}
              >
                {PAYMENT_TERMS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <FormInput
            label="Project Description"
            value={form.description}
            onChange={(val) => setForm((f) => ({ ...f, description: val }))}
            placeholder="e.g. Graphic Design Service"
            error={errors.description}
            darkMode={darkMode}
          />

          <ItemsList
            items={form.items}
            onUpdateItem={updateItem}
            onRemoveItem={removeItem}
            onAddItem={addItem}
            errors={errors}
            darkMode={darkMode}
          />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: isEdit ? "flex-end" : "space-between",
            gap: 8,
            paddingTop: 24,
            marginTop: 24,
            borderTop: `1px solid ${
              darkMode ? "hsl(233 28% 22%)" : "hsl(240 15% 88%)"
            }`,
          }}
        >
          <button
            onClick={onClose}
            style={{
              background: darkMode ? "hsl(233 28% 20%)" : "hsl(240 20% 96%)",
              color: darkMode ? "#DFE3FA" : "#7E88C3",
              border: "none",
              borderRadius: 999,
              padding: "14px 24px",
              fontWeight: 700,
              fontSize: 13,
              cursor: "pointer",
            }}
          >
            {isEdit ? "Cancel" : "Discard"}
          </button>

          {!isEdit && (
            <button
              onClick={handleDraft}
              style={{
                background: darkMode ? "hsl(233 28% 20%)" : "hsl(240 20% 96%)",
                color: "#7C5DFA",
                border: "none",
                borderRadius: 999,
                padding: "14px 24px",
                fontWeight: 700,
                fontSize: 13,
                cursor: "pointer",
              }}
            >
              Save as Draft
            </button>
          )}

          <button
            onClick={handleSend}
            style={{
              background: "#7C5DFA",
              color: "#fff",
              border: "none",
              borderRadius: 999,
              padding: "14px 24px",
              fontWeight: 700,
              fontSize: 13,
              cursor: "pointer",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#9277FF")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#7C5DFA")}
          >
            {isEdit ? "Save Changes" : "Send Invoice"}
          </button>
        </div>
      </div>
    </div>
  );
}
