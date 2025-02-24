import template from './siteFooter.html?raw'
import './siteFooter.scss'

class SiteFooter extends HTMLElement {
  constructor() {
    super()
    this.innerHTML = template
  }
}

customElements.define('site-footer', SiteFooter)
