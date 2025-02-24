export function sorting(fetchCallback) {
  return {
    sort(field) {
      this.sortField = field
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc'
      fetchCallback.call(this)
    },
  }
}
