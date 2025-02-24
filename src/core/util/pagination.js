export function pagination(fetchCallback) {
  return {
    currentPage() {
      return Math.ceil(this.skip / this.take) + 1
    },
    totalPages() {
      return Math.ceil(this.total / this.take)
    },
    nextPage() {
      if (this.skip + this.take < this.total) {
        this.skip += this.take
        fetchCallback.call(this)
      }
    },
    prevPage() {
      if (this.skip > 0) {
        this.skip -= this.take
        fetchCallback.call(this)
      }
    },
  }
}
