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
      dateCreated: new Date().toLocaleDateString()
    }
    this.items.push(item)
    return item
  }

  showAll() {
    if (this.items.length === 1) return this.items
    return this.limitTextTo20Chars()
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

  limitTextTo20Chars() {
    const limitedTextTodos = this.items.map((item) => {
      if (item.text.length > 20) {
        return { ...item, text: `${item.text.substring(0, 20)}...` }
      } else {
        return { ...item }
      }
    })

    return limitedTextTodos
  }

  getTodosByDate(date) {
    const todos = this.items.filter((item) => item.dateCreated === date)

    if (!todos) return []

    return todos
  }
}

module.exports = TodoList
