import template from './usersTable.pug'
import './usersTable.sass'
import {usersTable} from './usersTable'
import { AlpineComponent } from '../../core/AlpineComponent'

class UsersTable extends AlpineComponent {
  constructor() {
    super(template, usersTable)
  }
}

customElements.define('users-table', UsersTable)
