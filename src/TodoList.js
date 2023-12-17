class TodoList {
  constructor(date) {
    this.id = 0
    this.items = []
  }

  // unsure of how I could write a test to check that this is doing its job without set test needing to be updated daily (the hardcoded string to which the result would be compared would need to match the date at which the test is run)
  setCurrentDate() {
    const currentDate = new Date().toISOString().slice(0, 10)
    return currentDate
  }

  create(str) {
    this.id++
    const item = {
      id: this.id,
      text: str,
      status: 'incomplete',
      date: this.setCurrentDate()
    }
    this.items.push(item)
    return item
  }

  getAll() {
    return this.items
  }

  displaySummaryOrWholeText(item) {
    if (this.items.length === 1) return this.items[0].text
    const summary = item.text.slice(0, 20) + '...'
    return summary
  }

  displayAllSummaries() {
    if (this.items.length === 0) {
      throw Error('no summaries to display - todoList is empty')
    }
    if (this.items.length === 1) {
      throw Error(
        'only one todo - using displaySummaryOrWholeText() will display the whole text instead'
      )
    }
    const summaries = this.items.map(this.displaySummary)
    return summaries
  }

  setComplete(id) {
    const item = this.findBy(id)
    item.status = 'complete'
    return item
  }

  getByStatus(status) {
    return this.items.filter((item) => item.status === status)
  }

  findBy(id) {
    const item = this.items.find((item) => item.id === id)
    if (item === undefined) throw new Error('Item not found')
    return item
  }

  deleteBy(id) {
    const item = this.findBy(id)
    const index = this.items.indexOf(item)
    return this.items.splice(index, 1)[0]
  }

  findByDate(date) {
    const itemsFound = this.items.filter((item) => item.date === date)
    if (itemsFound.length === 0) throw new Error('no todos match this date')
    return itemsFound
  }
}

module.exports = TodoList
