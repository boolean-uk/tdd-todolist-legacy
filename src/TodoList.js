class TodoList {
  constructor () {
    this.id = 0
    this.items = []
    this.itemsShortText = []
  }

  create (str) {
    this.id++
    const item = { id: this.id, text: str, status: 'incomplete' }
    this.items.push(item)
    return item
  }

  showAll () {
    this.items.forEach(item => {
      if (item.text.length > 20) {
        item.text = `${item.text.substring(0, 20)}...`
        this.itemsShortText.push(item)
        return item
      } else {
        this.itemsShortText.push(item)
        return item
      }
    }) 
    return this.itemsShortText
  }

  setComplete (id) {
    const item = this.findBy(id)
    item.status = 'complete'
    return item
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
// todoList.create('Do the washing up')
// todoList.create('turn the heating on!')
// todoList.create("Do the laundry at exactly 9am")
// console.log(todoList.setComplete(1))
// console.log(todoList.getByStatus('incomplete'))
// console.log(todoList.showAll())
// todoList.showAll()

module.exports = TodoList
