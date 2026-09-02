import { Maximize2, Minimize2, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { isBrowserFullscreen, toggleBrowserFullscreen } from "@/lib/fullscreen";

interface FullscreenControlProps {
  onLaunchInFullscreen?: () => void;
  disabled?: boolean;
}

export function FullscreenControl({
  onLaunchInFullscreen,
  disabled = false,
}: FullscreenControlProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const updateFsState = () => {
      setIsFullscreen(isBrowserFullscreen());
    };

    updateFsState();

    document.addEventListener("fullscreenchange", updateFsState);
    document.addEventListener("webkitfullscreenchange", updateFsState);
    document.addEventListener("mozfullscreenchange", updateFsState);
    document.addEventListener("MSFullscreenChange", updateFsState);

    return () => {
      document.removeEventListener("fullscreenchange", updateFsState);
      document.removeEventListener("webkitfullscreenchange", updateFsState);
      document.removeEventListener("mozfullscreenchange", updateFsState);
      document.removeEventListener("MSFullscreenChange", updateFsState);
    };
  }, []);

  const handleToggle = async () => {
    await toggleBrowserFullscreen();
  };

  const handleLaunchCombined = async () => {
    if (!isBrowserFullscreen()) {
      await toggleBrowserFullscreen();
    }
    if (onLaunchInFullscreen) {
      onLaunchInFullscreen();
    }
  };

  return (
    <div className="flex flex-col gap-2 sm:gap-2.5 w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
        {/* Button 1: Prominent Fullscreen Toggle */}
        <button
          type="button"
          onClick={handleToggle}
          className="inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-xl sm:rounded-2xl border border-white/15 bg-white/5 hover:bg-white/10 active:scale-[0.98] px-3 sm:px-4 py-2.5 sm:py-3 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#F8FAFC] transition-all shadow-md backdrop-blur-md cursor-pointer truncate"
        >
          {isFullscreen ? (
            <>
              <Minimize2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 text-cyan-400" />
              <span className="truncate">Exit Fullscreen</span>
            </>
          ) : (
            <>
              <Maximize2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 text-cyan-400" />
              <span className="truncate">⛶ Enter Fullscreen</span>
            </>
          )}
        </button>

        {/* Button 2: Combined Launch in Fullscreen */}
        {onLaunchInFullscreen && (
          <button
            type="button"
            onClick={handleLaunchCombined}
            disabled={disabled}
            className="inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-xl sm:rounded-2xl border border-[#D4AF37]/40 bg-gradient-to-r from-[#D4AF37]/20 via-[#D4AF37]/10 to-transparent hover:border-[#D4AF37] active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none px-3 sm:px-4 py-2.5 sm:py-3 text-[11px] sm:text-xs font-black uppercase tracking-wider text-[#F5E6B3] transition-all shadow-md backdrop-blur-md cursor-pointer truncate"
          >
            <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 text-[#D4AF37]" />
            <span className="truncate">Launch in Fullscreen</span>
          </button>
        )}
      </div>
    </div>
  );
}
