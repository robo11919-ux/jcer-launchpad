import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, RotateCcw } from "lucide-react";

interface ResetControlProps {
  onConfirmReset: () => void;
  disabled?: boolean;
}

export function ResetControl({ onConfirmReset, disabled = false }: ResetControlProps) {
  const [modalOpen, setModalOpen] = useState(false);

  const handleConfirm = () => {
    setModalOpen(false);
    onConfirmReset();
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {/* Subtle secondary outlined trigger */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setModalOpen(true)}
        className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-2.5 text-xs font-semibold text-[#94A3B8] transition-colors hover:border-white/25 hover:bg-white/10 hover:text-white active:scale-95 disabled:opacity-50"
      >
        <RotateCcw className="h-3.5 w-3.5 text-[#D4AF37]" />
        <span>Reset Ceremony</span>
      </button>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative w-full max-w-sm overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-b from-[#0D1B2A] to-[#07111F] p-6 text-[#F8FAFC] shadow-2xl"
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 28 }}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-amber-500/40 bg-amber-500/15 text-amber-400">
                  <AlertCircle className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-base font-black text-white">Reset Ceremony?</h4>
                  <p className="text-[10px] uppercase tracking-wider text-[#D4AF37]">
                    Return LED Screen to Ready State
                  </p>
                </div>
              </div>

              <p className="mt-4 text-xs text-[#94A3B8] leading-relaxed">
                Reset the entire ceremony and return the LED display to the closed velvet curtain READY state?
              </p>

              <div className="mt-6 flex gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="flex-1 rounded-xl border border-white/20 bg-white/5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#94A3B8] hover:bg-white/10 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirm}
                  className="flex-1 rounded-xl border border-red-700/60 bg-red-900/80 py-2.5 text-xs font-black uppercase tracking-wider text-white hover:bg-red-800 active:scale-95"
                >
                  Reset Ceremony
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
