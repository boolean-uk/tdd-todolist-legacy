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
      date: new Date().toDateString()
    }
    this.items.push(item)
    return item
  }

  checkChar(item) {
    if (item.text.length > 20) {
      const newText = item.text.slice(0, 20) + '...'
      const itemCopy = { ...item, text: newText }
      return itemCopy
    }
    return item
  }

  showAll() {
    const items20Char = this.items.map(this.checkChar)
    return items20Char
  }

  setComplete(id) {
    const item = this.findBy(id)
    item.status = 'complete'
    return item
  }

  toggleStatus(id) {
    const item = this.findBy(id)
    if (item.status === 'incomplete') {
      item.status = 'complete'
    }
    if (item.status === 'complete') {
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

  getByDate(date) {
    return this.items.filter((item) => item.date.toLowerCase().includes(date))
  }

  editText(id, newText) {
    const updatedList = this.items.map((item) => {
      if (item.id === id) {
        const itemCopy = { ...item, text: newText }
        return itemCopy
      }
      return item
    })
    return updatedList
  }
}

module.exports = TodoList
