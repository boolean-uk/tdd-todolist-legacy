class TodoList {
  constructor() {
    this.id = 0
    this.items = []
  }

  create(str) {
    const date = new Date()
    this.id++
    const item = {
      id: this.id,
      text: str,
      status: 'incomplete',
      date: date.toLocaleDateString()
    }
    this.items.push(item)
    return item
  }

  showAll() {
    if (this.items.length <= 1) {
      return this.items
    }
    const clone = this.items.map((item) => {
      if (item.text.length > 20) {
        item.text = `${item.text.slice(0, 20)}...`
        return item
      }
      return item
    })
    return clone
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
}

module.exports = TodoList
