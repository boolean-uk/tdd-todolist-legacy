class TodoList {
  constructor () {
    this.id = 0
    this.items = []
  }

  create (str) {
    this.id++
    const item = { id: this.id, text: str, status: 'incomplete' }
    this.items.push(item)
    return item
  }

  showAll () {
    return this.items
  }

  setComplete (id) {
    const findItembyId = this.findBy(id)
    findItembyId.status = 'complete'
    return findItembyId
  }

  getByStatus (status) {
    return this.items.filter(item => item.status === status)
  }

  findBy (id) {
    const item = this.items.find(item => item.id === id)
    if (item === undefined) throw new Error('Item not found')
    return item
  }

  deleteBy (id) {
    const item = this.findBy(id)
    const index = this.items.indexOf(item)
    return this.items.splice(index, 1)[0]
  }
}

const todoList = new TodoList()
console.log(todoList.create('Do the washing up'))
// console.log(todoList.create('turn the heating on!'))
console.log(todoList.setComplete())
// console.log(todoList.showAll())

module.exports = TodoList
