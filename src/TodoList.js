class TodoList {
  constructor() {
    this.id = 0
    this.items = []
  }

  create(str, createdDate = new Date()) {
    this.id++
    const item = {
      id: this.id,
      text: str,
      status: 'incomplete',
      createdAt: createdDate
    }
    this.items.push(item)
    return item
  }

  findByDay(day) {
    return this.items.filter((item) => {
      const options = { weekday: 'long' }
      const itemDay = new Intl.DateTimeFormat('en-GB', options).format(
        item.createdAt
      )

      return day === itemDay
    })
  }

  showAll() {
    return this.items.map((todo) => {
      if (todo.text.length > 20) {
        todo.text = todo.text.substring(0, 20) + '...'
      }

      return todo
    })
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
