class TodoList {
  constructor() {
    this.id = 0
    this.items = []
    this.longTextItems = []
  }

  create(str) {
    this.id++
    const item = {
      id: this.id,
      text: str,
      status: 'incomplete',
      date: new Date().toLocaleDateString()
    }
    this.items.push(item)
    return item
  }

  showAll() {
    this.items.forEach((toDoItem) => {
      if (toDoItem.text.length > 20) {
        toDoItem.text = `${toDoItem.text.substring(0, 20)}...`
        this.longTextItems.push(toDoItem)
        return toDoItem
      } else {
        this.longTextItems.push(toDoItem)
        return toDoItem
      }
    })
    return this.longTextItems
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

  getByDate(){
    
  }
}

const todoList = new TodoList()

todoList.create('homework')
todoList.create('classworkssssssssssssssssssssssssssssssss')
todoList.setComplete(2)
// console.log(todoList.setComplete(3))
// console.log(todoList.getByStatus('complete'))
// console.log(todoList.findBy(1))
console.log(todoList.deleteBy(1))

console.log(todoList.showAll())

todoList.showAll()
module.exports = TodoList
