class TodoList {
  constructor() {
    this.id = 0
    this.items = []
  }

  create(str) {
    this.id++
    const item = { id: this.id, text: str, status: 'incomplete' }
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
}

const todoList = new TodoList()

todoList.create('homework')
todoList.create('classwork')
todoList.setComplete(2)
// console.log(todoList.setComplete(3))
// console.log(todoList.getByStatus('complete'))
// console.log(todoList.findBy(1))
console.log(todoList.deleteBy(1))

console.log(todoList.showAll())

todoList.showAll()
module.exports = TodoList
