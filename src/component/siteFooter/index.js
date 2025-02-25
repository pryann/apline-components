import template from './siteFooter.html?raw'
import './siteFooter.scss'
import { AlpineComponent } from '../../core/AlpineComponent'

class SiteFooter extends AlpineComponent {
  constructor() {
    super(template)
  }
}

customElements.define('site-footer', SiteFooter)
