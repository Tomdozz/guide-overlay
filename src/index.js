import { createUI } from "./ui.js";
import { saveSteps, loadSteps } from "./storage.js";

function startGuideOverlay() {
  if (window.GuideOverlayLoaded) return;
  window.GuideOverlayLoaded = true;

  let steps = loadSteps();

  function init() {
    createUI(steps, saveSteps);
  }

  init();
}

export default startGuideOverlay;

// Attach to `window` for CDN usage
if (typeof window !== "undefined") {
  window.startGuideOverlay = startGuideOverlay;
}
