class TodoList {
  constructor() {
    this.id = 0
    this.items = []
  }

  create(str) {
    this.id++
    const date = new Date().toLocaleDateString('en-gb')
    const item = { id: this.id, text: str, date: date, status: 'incomplete' }
    this.items.push(item)
    return item
  }

  showAll() {
    const displayList = this.items.map((item) => {
      const displayItem = { ...item }
      if (displayItem.text.length > 20 && this.items.length > 1) {
        displayItem.text = `${displayItem.text.slice(0, 20)}...`
      }
      return displayItem
    })
    return displayList
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
    return this.items.filter((item) => item.date === date)
  }
}

module.exports = TodoList
