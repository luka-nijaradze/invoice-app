import React from "react";

export default function DeleteModal({
  invoiceId,
  darkMode,
  onCancel,
  onConfirm,
}) {
  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/50">
      <div
        className="bg-white dark:bg-[hsl(233_28%_16%)] rounded-lg p-12 max-w-[480px] w-[90%] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-[hsl(231_28%_22%)] dark:text-[hsl(240_20%_88%)] text-2xl font-bold mb-4">
          Confirm Deletion
        </h2>
        <p className="text-[hsl(231_15%_55%)] dark:text-[hsl(231_15%_52%)] text-sm leading-relaxed mb-8">
          Are you sure you want to delete invoice #{invoiceId}? This action
          cannot be undone.
        </p>
        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="bg-[hsl(240_20%_96%)] dark:bg-[hsl(233_28%_20%)] text-[#7E88C3] dark:text-[#DFE3FA] border-none rounded-full py-3.5 px-6 font-bold text-sm cursor-pointer transition-colors hover:bg-[hsl(240_20%_90%)] dark:hover:bg-[hsl(233_28%_26%)]"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-[#EC5757] text-white border-none rounded-full py-3.5 px-6 font-bold text-sm cursor-pointer transition-colors hover:bg-[#FF9797]"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
