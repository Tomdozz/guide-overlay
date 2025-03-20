;(function () {
  if (window.GuideOverlay) return

  window.GuideOverlay = {
    loaded: false,
    start: function (cssUrl) {
      if (this.loaded) return
      this.loaded = true
      loadCSS(cssUrl)
      init()
    },
  }

  let steps = JSON.parse(localStorage.getItem('guide-steps')) || []

  function loadCSS(cssUrl) {
    if (!cssUrl) return
    let link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = cssUrl
    document.head.appendChild(link)
  }

  function saveSteps() {
    localStorage.setItem('guide-steps', JSON.stringify(steps))
  }

  function createPanel() {
    let panel = document.createElement('div')
    panel.id = 'guide-panel'
    panel.innerHTML = createUITemplate()
    document.body.appendChild(panel)
  }

  function createUITemplate() {
    return `
      <div id="guide-header">Guide Builder</div>
      <ul id="steps-list"></ul>
      <div class="actions">
          <button class="ui-btn full-width" id="export-guide">Export Guide</button>
          <button class="ui-btn full-width" id="clear-guide">Clear</button>
      </div>
    `
  }

  function createStepTemplate(step, index) {
    return `
      <div class="step-container" data-index="${index}">
          <strong>${index} ${step.selector}</strong>
          <input type="text" class="step-title" value="${step.title}" data-index="${index}" placeholder="Step Title">
          <textarea class="step-description" data-index="${index}" placeholder="Step Description">${step.description}</textarea>
          <div class="actions">
              <button class="delete-step ui-btn" data-index="${index}">🗑️</button>
          </div>
      </div>
    `
  }

  function makeDraggable(el) {
    let offsetX,
      offsetY,
      isDragging = false
    el.addEventListener('mousedown', (e) => {
      isDragging = true
      offsetX = e.clientX - el.offsetLeft
      offsetY = e.clientY - el.offsetTop
    })
    document.addEventListener('mousemove', (e) => {
      if (!isDragging) return
      el.style.left = `${e.clientX - offsetX}px`
      el.style.top = `${e.clientY - offsetY}px`
    })
    document.addEventListener('mouseup', () => (isDragging = false))
  }

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
  })

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

  function updateUI() {
    let stepsList = document.getElementById('steps-list')
    stepsList.innerHTML = steps.map((step, index) => createStepTemplate(step, index)).join('')
    attachEventListeners()
  }

  function attachEventListeners() {
    document.querySelectorAll('.step-title').forEach((input) => {
      input.addEventListener('input', function () {
        let index = this.dataset.index
        steps[index].title = this.value
        saveSteps()
      })
    })

    document.querySelectorAll('.step-description').forEach((textarea) => {
      textarea.addEventListener('input', function () {
        let index = this.dataset.index
        steps[index].description = this.value
        saveSteps()
      })
    })

    document.querySelectorAll('.delete-step').forEach((button) => {
      button.addEventListener('click', function () {
        let index = this.dataset.index
        steps.splice(index, 1)
        saveSteps()
        updateUI()
      })
    })
  }

  function setupButtons() {
    document.getElementById('export-guide').addEventListener('click', function () {
      console.log('Guide Steps:', JSON.stringify(steps, null, 2))
      alert('Check the console for exported guide steps!')
    })

    document.getElementById('clear-guide').addEventListener('click', function () {
      steps = []
      saveSteps()
      updateUI()
    })
  }

  function init() {
    createPanel()
    updateUI()
    setupButtons()
    makeDraggable(document.getElementById('guide-panel'))
  }
})()
