export function createUI(steps, saveSteps) {
    let panel = document.createElement("div");
    panel.id = "guide-panel";
    panel.innerHTML = `
      <div id="guide-header">Guide Builder</div>
      <ul id="steps-list"></ul>
      <div class="actions">
        <button class="ui-btn full-width" id="export-guide">Export Guide</button>
        <button class="ui-btn full-width" id="clear-guide">Clear</button>
      </div>
    `;
  
    document.body.appendChild(panel);
    updateUI(steps);
  
    document.getElementById("export-guide").addEventListener("click", () => {
      console.log("Guide Steps:", JSON.stringify(steps, null, 2));
      alert("Check the console for exported guide steps!");
    });
  
    document.getElementById("clear-guide").addEventListener("click", () => {
      steps.length = 0;
      saveSteps(steps);
      updateUI(steps);
    });
  }
  
  /**
   * Updates the UI with the latest steps.
   */
  export function updateUI(steps) {
    let stepsList = document.getElementById("steps-list");
    if (!stepsList) return;
  
    stepsList.innerHTML = "";
  
    steps.forEach((step, index) => {
      let li = document.createElement("li");
      li.textContent = `Step ${index + 1}: ${step.selector}`;
      stepsList.appendChild(li);
    });
  }
  