import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar.jsx";
import InvoiceList from "./components/InvoiceList.jsx";
import InvoiceDetail from "./components/InvoiceDetails.jsx";
import InvoiceForm from "./components/InvoiceForm.jsx";
import DeleteModal from "./components/DeleteModal.jsx";
import { initialInvoices } from "./data/invoices.js";
import {
  localStorage_invoices,
  darkModeStorage,
} from "./utils/localStorage.js";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  const [invoices, setInvoices] = useState(() => {
    if (typeof window !== "undefined") {
      window.sessionStorage.removeItem("invoice-data");
    }
    const stored = localStorage_invoices.getAll();
    return stored.length > 0 ? stored : initialInvoices;
  });

  const [selectedId, setSelectedId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    darkModeStorage.set(darkMode);
  }, [darkMode]);

  useEffect(() => {
    localStorage_invoices.saveAll(invoices);
  }, [invoices]);

  const selectedInvoice = selectedId
    ? invoices.find((inv) => inv.id === selectedId)
    : null;

  const handleToggleDark = () => setDarkMode((d) => !d);

  const handleSelectInvoice = (id) => setSelectedId(id);

  const handleGoBack = () => setSelectedId(null);

  const openForm = () => {
    setShowForm(true);
    window.requestAnimationFrame(() => setIsFormOpen(true));
  };

  const handleNewInvoice = () => {
    setEditingInvoice(null);
    openForm();
  };

  const handleEdit = () => {
    setEditingInvoice(selectedInvoice);
    openForm();
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setTimeout(() => {
      setShowForm(false);
      setEditingInvoice(null);
    }, 320);
  };

  const handleSave = (invoice) => {
    setInvoices((prev) => {
      const idx = prev.findIndex((i) => i.id === invoice.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = invoice;
        return next;
      }
      return [...prev, invoice];
    });
    if (invoice.id && !selectedId) {
      setSelectedId(invoice.id);
    }
    handleCloseForm();
  };

  const handleSaveDraft = (invoice) => {
    setInvoices((prev) => [...prev, invoice]);
    handleCloseForm();
  };

  const handleDelete = () => setShowDeleteModal(true);

  const handleConfirmDelete = () => {
    setInvoices((prev) => prev.filter((i) => i.id !== selectedId));
    setSelectedId(null);
    setShowDeleteModal(false);
  };

  const handleMarkAsPaid = () => {
    setInvoices((prev) =>
      prev.map((i) => (i.id === selectedId ? { ...i, status: "paid" } : i)),
    );
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        width: "100%",
      }}
    >
      <Sidebar darkMode={darkMode} onToggleDark={handleToggleDark} />

      {selectedInvoice ? (
        <InvoiceDetail
          invoice={selectedInvoice}
          darkMode={darkMode}
          onGoBack={handleGoBack}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onMarkAsPaid={handleMarkAsPaid}
        />
      ) : (
        <InvoiceList
          invoices={invoices}
          darkMode={darkMode}
          onSelectInvoice={handleSelectInvoice}
          onNewInvoice={handleNewInvoice}
        />
      )}

      {showForm && (
        <InvoiceForm
          invoice={editingInvoice}
          darkMode={darkMode}
          open={isFormOpen}
          onClose={handleCloseForm}
          onSave={handleSave}
          onSaveDraft={handleSaveDraft}
        />
      )}

      {showDeleteModal && selectedInvoice && (
        <DeleteModal
          invoiceId={selectedInvoice.id}
          darkMode={darkMode}
          onCancel={() => setShowDeleteModal(false)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
}
