import template from './usersTable.html?raw'
import './usersTable.css'

import { AlpineComponent } from '.'
class UsersTable extends AlpineComponent {
  constructor() {
    super(template, usersTable)
  }
}

customElements.define('users-table', UsersTable)
