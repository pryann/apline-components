import { usersTable } from './usersTable.js'
import {AlpineComponent} from '../../core/AlpineComponent.js'

const template = await fetch('./usersTable.html').then(content => content.text());

class UsersTable extends AlpineComponent {
  constructor() {
    super(template, usersTable)
  }
}

customElements.define('users-table', UsersTable)
