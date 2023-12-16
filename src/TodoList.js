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
      creationDate: 'date that the ToDo was created'
    }
    this.items.push(item)
    return item
  }

  showAll() {
    return this.items
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

  showMaxChar() {
    // eslint-disable-next-line no-unused-vars
    const maxText = this.items.map((item) => {
      if (item.text.length > 20) {
        return { ...item, text: `${item.text.substring(0, 20)}....` }
      }
      return { maxText }
    })
    return maxText
  }

  todoCreationDate(date) {
    const todoDate = this.items.filter((item) => item.creationDate === date)

    if (!todoDate) {
      return []
    }

    return todoDate
  }
}

module.exports = TodoList
