class TodoList {
  constructor() {
    this.idCounter = 0
    this.items = []
    this.truncatedItems = []
  }

  create(task) {
    this.idCounter++
    const item = {
      id: this.idCounter,
      text: task,
      status: 'incomplete',
      date: new Date().toLocaleDateString()
    }
    this.items.push(item)
    return item
  }

  showAll() {
    this.items.forEach((toDoItem) => {
      const truncatedText =
        toDoItem.text.length > 20
          ? `${toDoItem.text.substring(0, 20)}...`
          : toDoItem.text
      this.truncatedItems.push({ ...toDoItem, text: truncatedText })
    })
    return this.truncatedItems
  }

  setComplete(id) {
    const item = this.findById(id)
    item.status = 'complete'
    return item
  }

  getByStatus(status) {
    return this.items.filter((item) => item.status === status)
  }

  findById(id) {
    const item = this.items.find((item) => item.id === id)
    if (item === undefined) throw new Error('Item not found')
    return item
  }

  deleteById(id) {
    const item = this.findById(id)
    const index = this.items.indexOf(item)
    return this.items.splice(index, 1)[0]
  }

  getByDate(date) {
    const itemsOnDate = this.items.filter((item) => item.date === date)
    return itemsOnDate.length === 0 ? [] : itemsOnDate
  }
}

const todoList = new TodoList()

todoList.create('Complete homework')
todoList.create('Attend classes and labs')
todoList.setComplete(2)
console.log(todoList.getByDate('18/12/2023'))

console.log(todoList.showAll())

todoList.showAll()
module.exports = TodoList
