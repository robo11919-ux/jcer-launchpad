import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Rocket, RotateCcw, Radio, ExternalLink } from "lucide-react";
import { LIVE_ERP_URL } from "@/lib/launch";

interface ControllerHeaderProps {
  onResetClick: () => void;
  screenOnline: boolean;
}

export function ControllerHeader({ onResetClick, screenOnline }: ControllerHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="relative border-b border-white/10 bg-[#07111F]/95 backdrop-blur-md px-4 sm:px-6 py-3.5 sm:py-4 z-40">
      <div className="mx-auto flex max-w-lg items-center justify-between gap-3">
        {/* Left Branding */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#D4AF37] shadow-[0_0_8px_#D4AF37]" />
            <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] sm:tracking-[0.28em] text-[#D4AF37] truncate">
              Jain College of Engineering &amp; Research
            </p>
          </div>
          <h1 className="mt-0.5 sm:mt-1 text-base sm:text-lg font-black tracking-tight text-[#F8FAFC] truncate">
            JCER ADMISSION ERP
          </h1>
          <p className="text-[10px] sm:text-[11px] font-medium tracking-wide text-[#94A3B8] truncate">
            Official Launch Control · Belagavi
          </p>
        </div>

        {/* Right Menu Trigger */}
        <button
          aria-label="Open settings menu"
          onClick={() => setMenuOpen(true)}
          className="shrink-0 rounded-xl border border-white/10 bg-[#12243A]/80 p-2 sm:p-2.5 text-[#F8FAFC] shadow-sm transition-colors hover:border-[#D4AF37]/50 active:scale-95 cursor-pointer"
        >
          <Menu className="h-4 w-4 text-[#D4AF37]" />
        </button>
      </div>

      {/* Slide-out Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMenuOpen(false)}
          >
            <motion.aside
              className="absolute right-0 top-0 h-full w-[85vw] max-w-xs sm:w-80 border-l border-white/10 bg-[#0D1B2A] p-5 sm:p-6 shadow-2xl flex flex-col justify-between"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ ease: "easeInOut", duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div>
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37]">
                      Console Menu
                    </p>
                    <p className="text-sm font-black text-[#F8FAFC]">
                      JCER Admission ERP
                    </p>
                  </div>
                  <button
                    aria-label="Close menu"
                    onClick={() => setMenuOpen(false)}
                    className="rounded-lg p-2 text-[#94A3B8] hover:text-white cursor-pointer"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <nav className="mt-5 sm:mt-6 space-y-2.5 sm:space-y-3">
                  <button
                    onClick={() => setMenuOpen(false)}
                    className="flex w-full items-center gap-3.5 rounded-2xl border border-white/10 bg-[#12243A] px-4 py-3 text-left text-xs sm:text-sm font-bold text-[#F8FAFC] active:bg-white/10 cursor-pointer"
                  >
                    <Rocket className="h-4 w-4 text-[#D4AF37]" /> Launch Controller
                  </button>

                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      onResetClick();
                    }}
                    className="flex w-full items-center gap-3.5 rounded-2xl border border-white/10 bg-[#12243A] px-4 py-3 text-left text-xs sm:text-sm font-bold text-[#F8FAFC] active:bg-white/10 cursor-pointer"
                  >
                    <RotateCcw className="h-4 w-4 text-[#D4AF37]" /> Reset Ceremony
                  </button>

                  <Link
                    to="/status"
                    onClick={() => setMenuOpen(false)}
                    className="flex w-full items-center gap-3.5 rounded-2xl border border-white/10 bg-[#12243A] px-4 py-3 text-left text-xs sm:text-sm font-bold text-[#F8FAFC] active:bg-white/10 cursor-pointer"
                  >
                    <Radio className="h-4 w-4 text-[#D4AF37]" /> System Diagnostics
                  </Link>

                  <a
                    href={LIVE_ERP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-[#12243A] px-4 py-3 text-left text-xs sm:text-sm font-bold text-[#F8FAFC] active:bg-white/10 cursor-pointer"
                  >
                    <span className="flex items-center gap-3.5">
                      <ExternalLink className="h-4 w-4 text-emerald-400" /> Live Admission ERP
                    </span>
                    <span className="text-[10px] uppercase text-[#94A3B8]">Open</span>
                  </a>
                </nav>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#07111F] p-3.5 sm:p-4 text-xs text-[#94A3B8]">
                <div className="flex items-center justify-between">
                  <span>LED Display Link:</span>
                  <span className={`font-bold ${screenOnline ? "text-emerald-400" : "text-red-400"}`}>
                    {screenOnline ? "Connected" : "Offline"}
                  </span>
                </div>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
