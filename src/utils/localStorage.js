// Session Storage Utility Functions
const STORAGE_KEY = "invoice-data";
const DARK_MODE_KEY = "invoice-dark-mode";

export const localStorage_invoices = {
  // Get all invoices from sessionStorage
  getAll: () => {
    try {
      const stored = window.sessionStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error("Error reading invoices from sessionStorage:", error);
      return [];
    }
  },

  // Get single invoice
  getOne: (id) => {
    const invoices = localStorage_invoices.getAll();
    return invoices.find((inv) => inv.id === id) || null;
  },

  // Save invoices
  saveAll: (invoices) => {
    try {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(invoices));
      return true;
    } catch (error) {
      console.error("Error saving invoices to sessionStorage:", error);
      return false;
    }
  },

  // Create new invoice
  create: (invoice) => {
    const invoices = localStorage_invoices.getAll();
    invoices.push(invoice);
    localStorage_invoices.saveAll(invoices);
    return invoice;
  },

  // Update invoice
  update: (id, updatedInvoice) => {
    const invoices = localStorage_invoices.getAll();
    const index = invoices.findIndex((inv) => inv.id === id);
    if (index >= 0) {
      invoices[index] = { ...invoices[index], ...updatedInvoice };
      localStorage_invoices.saveAll(invoices);
      return invoices[index];
    }
    return null;
  },

  // Delete invoice
  delete: (id) => {
    const invoices = localStorage_invoices.getAll();
    const filtered = invoices.filter((inv) => inv.id !== id);
    localStorage_invoices.saveAll(filtered);
    return true;
  },
};

// Dark mode utilities
export const darkModeStorage = {
  get: () => {
    try {
      const stored = localStorage.getItem(DARK_MODE_KEY);
      if (stored !== null) return stored === "true";
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    } catch {
      return false;
    }
  },

  set: (isDark) => {
    try {
      localStorage.setItem(DARK_MODE_KEY, String(isDark));
    } catch (error) {
      console.error("Error saving dark mode preference:", error);
    }
  },
};
