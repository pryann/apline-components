import template from './usersTable.html?raw'
import './usersTable.css'
import {usersTable} from './usersTable'
import { AlpineComponent } from '../../core/AlpineComponent'

class UsersTable extends AlpineComponent {
  constructor() {
    super(template, usersTable)
  }
}

customElements.define('users-table', UsersTable)
