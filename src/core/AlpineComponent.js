export class AlpineComponent extends HTMLElement {
  constructor(template, componentFunction) {
    super()
    this.template = template
    this.componentFunction = componentFunction
  }

  connectedCallback() {
    this.innerHTML = this.template
    this.initAlpine()
  }

  initAlpine() {
    if (!window.Alpine) {
      console.error('Alpine.js is not loaded')
      return
    }
    window[this.componentFunction.name] = this.componentFunction
  }
}
