export function saveSteps(steps) {
    localStorage.setItem("guide-steps", JSON.stringify(steps));
  }
  
  export function loadSteps() {
    return JSON.parse(localStorage.getItem("guide-steps")) || [];
  }
  