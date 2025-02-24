import { pagination } from '../../core/util/pagination'
import { sorting } from '../../core/util/sorting'
import { getUsers } from '../../api/usersApi'

export function usersTable() {
  return {
    users: [],
    email: '',
    skip: 0,
    take: 2,
    total: 0,
    sortField: 'id',
    sortOrder: 'asc',

    async fetchUsers() {
      try {
        const data = await getUsers({
          skip: this.skip,
          take: this.take,
          sortField: this.sortField,
          sortOrder: this.sortOrder,
        })
        this.total = 10
        this.users = data
      } catch (error) {
        console.error('Fetching error', error)
      }
    },

    ...pagination(function () {
      this.fetchUsers()
    }),

    ...sorting(function () {
      this.fetchUsers()
    }),

    init() {
      this.fetchUsers()
    },
  }
}

