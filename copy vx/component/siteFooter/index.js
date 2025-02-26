import template from './siteFooter.pug'
import './siteFooter.sass'
import { AlpineComponent } from '../../core/AlpineComponent'

class SiteFooter extends AlpineComponent {
  constructor() {
    super(template)
  }
}

customElements.define('site-footer', SiteFooter)
