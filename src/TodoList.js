class TodoList {
  constructor() {
    this.id = 0
    this.items = []
  }

  create(str, date) {
    this.id++
    const item = { id: this.id, text: str, status: 'incomplete', date: date }
    this.items.push(item)
    return item
  }

  showAll() {
    return this.items.map((item) => {
      if (item.text.length > 20) {
        return { ...item, text: item.text.substring(0, 20) + '...' }
      } else {
        return item
      }
    })
  }

  setComplete(id) {
    const item = this.findBy(id)
    if (item) {
      item.status = 'complete'
      return item
    }
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
    const itemIndex = this.items.findIndex((item) => item.id === id)
    if (itemIndex === -1) {
      throw new Error('Item not found')
    }
    return this.items.splice(itemIndex, 1)[0]
  }
}

module.exports = TodoList
