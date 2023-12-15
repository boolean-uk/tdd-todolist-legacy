class TodoList {
  constructor() {
    this.id = 0
    this.items = []
  }

  create(str) {
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const dateString = `${year}-${month}-${day}`

    this.id++
    const item = {
      id: this.id,
      text: str,
      status: 'incomplete',
      date: dateString
    }
    this.items.push(item)
    return item
  }

  showAll() {
    this.items.map((item) => {
      if (item.text.length > 20) {
        item.text = item.text.slice(0, 20).concat('...')
      }
      return item
    })
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

  findByDate(date) {
    this.items.filter((item) => {
      return (item.date = date)
    })
    return this.items
  }
}

const todolist = new TodoList()
console.log(todolist.create('wash dishes now'))
console.log(todolist.create('wash the car'))
console.log('Show all method', todolist.showAll())
console.log('Find By Date Method', todolist.findByDate('2023-12-15'))

module.exports = TodoList
