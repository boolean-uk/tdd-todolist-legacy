class TodoList {
  constructor() {
    this.items = []
  }

  create(str, date = new Date().toISOString().slice(0, 9).trim()) {
    const item = {
      id: this.items.length + 1,
      text: str,
      status: 'incomplete',
      date
    }
    this.items.push(item)

    return item
  }

  showAll() {
    const filteredList = this.items.map((item) => ({
      ...item,
      text:
        item.text.length > 20
          ? `${item.text.slice(0, 20).trim()}...`
          : item.text
    }))

    return filteredList
  }

  setComplete(id) {
    const item = this.findBy(id)
    item.status = 'complete'
    return item
  }

  toggleComplete(id) {
    const item = this.findBy(id)

    if (item.status === 'incomplete') {
      item.status = 'complete'
    } else {
      item.status = 'incomplete'
    }

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
    const searchedList = this.items.filter((item) => item.date === date)

    return searchedList
  }

  editTextById(id, text) {
    const item = this.findBy(id)
    item.text = text
    return item
  }
}

module.exports = TodoList
