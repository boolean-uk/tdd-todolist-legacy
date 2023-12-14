class TodoList {
  constructor() {
    this.id = 0
    this.items = []
  }

  create(str) {
    this.id++
    const item = {
      id: this.id,
      text: str,
      status: 'incomplete',
      created: new Date()
    }
    this.items.push(item)
    return item
  }

  formatTextOverflow() {
    const reducedText = [...this.items]

    reducedText.forEach((item) => {
      if (item.text.length >= 20) {
        item.text = item.text.slice(0, 17) + '...'
      }
    })

    return reducedText
  }

  showAll() {
    if (this.items.length === 1) {
      return this.items
    }

    return this.formatTextOverflow()
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

  filterByDay(day) {
    const items = this.items.filter((item) => item.created.getDate() === day)
    return items
  }

  deleteBy(id) {
    const item = this.findBy(id)
    const index = this.items.indexOf(item)
    return this.items.splice(index, 1)[0]
  }
}

module.exports = TodoList
