class TodoList {
  constructor() {
    this.id = 0
    this.items = []
  }

  create(str) {
    this.id++
    const todaysDate = new Date().toISOString().slice(0, 10)
    const item = {
      id: this.id,
      text: str,
      status: 'incomplete',
      date: `${todaysDate}`
    }

    this.items.push(item)
    return item
  }

  showAll() {
    return this.items
  }

  displayAllItemsText() {
    if (!this.items || this.items.length === 0) return 'No todo items'
    if (this.items.length === 1) {
      return this.items[0].text
    }
    const itemsText = this.items.map((item) => {
      if (item.text.length <= 20) {
        return item.text
      }
      return item.text.slice(0, 20) + '...'
    })
    return itemsText
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

  findTodoByDate(date) {
    if (!date || date.length === 0 || typeof date === 'number')
      return 'Please enter a date using numbers in format of "YYYY-MM-DD"'
    const todosByDate = this.items.filter((item) => item.date === date)
    return todosByDate
  }

  deleteBy(id) {
    const item = this.findBy(id)
    const index = this.items.indexOf(item)
    return this.items.splice(index, 1)[0]
  }
}

module.exports = TodoList
