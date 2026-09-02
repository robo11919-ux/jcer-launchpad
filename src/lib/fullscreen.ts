/**
 * Cross-browser Fullscreen API helper with vendor prefixes.
 */

export function isBrowserFullscreen(): boolean {
  if (typeof document === "undefined") return false;
  const doc = document as Document & {
    webkitFullscreenElement?: Element;
    mozFullScreenElement?: Element;
    msFullscreenElement?: Element;
  };

  return Boolean(
    doc.fullscreenElement ||
    doc.webkitFullscreenElement ||
    doc.mozFullScreenElement ||
    doc.msFullscreenElement
  );
}

export async function requestBrowserFullscreen(element?: HTMLElement): Promise<boolean> {
  if (typeof document === "undefined") return false;
  const el = (element || document.documentElement) as HTMLElement & {
    webkitRequestFullscreen?: () => Promise<void> | void;
    mozRequestFullScreen?: () => Promise<void> | void;
    msRequestFullscreen?: () => Promise<void> | void;
  };

  try {
    if (el.requestFullscreen) {
      await el.requestFullscreen();
      return true;
    } else if (el.webkitRequestFullscreen) {
      await el.webkitRequestFullscreen();
      return true;
    } else if (el.mozRequestFullScreen) {
      await el.mozRequestFullScreen();
      return true;
    } else if (el.msRequestFullscreen) {
      await el.msRequestFullscreen();
      return true;
    }
  } catch (err) {
    console.error("[Fullscreen] requestFullscreen failed:", err);
    return false;
  }
  return false;
}

export async function exitBrowserFullscreen(): Promise<boolean> {
  if (typeof document === "undefined") return false;
  const doc = document as Document & {
    webkitExitFullscreen?: () => Promise<void> | void;
    mozCancelFullScreen?: () => Promise<void> | void;
    msExitFullscreen?: () => Promise<void> | void;
  };

  try {
    if (doc.exitFullscreen) {
      await doc.exitFullscreen();
      return true;
    } else if (doc.webkitExitFullscreen) {
      await doc.webkitExitFullscreen();
      return true;
    } else if (doc.mozCancelFullScreen) {
      await doc.mozCancelFullScreen();
      return true;
    } else if (doc.msExitFullscreen) {
      await doc.msExitFullscreen();
      return true;
    }
  } catch (err) {
    console.error("[Fullscreen] exitFullscreen failed:", err);
    return false;
  }
  return false;
}

export async function toggleBrowserFullscreen(element?: HTMLElement): Promise<boolean> {
  if (isBrowserFullscreen()) {
    return exitBrowserFullscreen();
  } else {
    return requestBrowserFullscreen(element);
  }
}
