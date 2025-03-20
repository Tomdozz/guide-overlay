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

    document.addEventListener('mousedown', function (event) {
        let target = event.target
        if (target.closest('#guide-panel')) return
    
        let selector = getBestSelector(target)
    
        steps.push({
          selector: selector,
          title: 'Title',
          description: '',
        })
        saveSteps()
        updateUI()
        event.preventDefault()
      });
  }

  function getBestSelector(target) {
    let current = target

    for (let i = 0; i < 5 && current; i++) {
      if (current.className && typeof current.className === 'string') {
        return `.${current.className.trim().split(/\s+/).join('.')}`
      }
      current = current.parentElement
    }

    if (target.id) return `#${target.id}`
    let closestWithID = target.closest('[id]')
    if (closestWithID) return `#${closestWithID.id}`
    return target.tagName.toLowerCase()
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
  