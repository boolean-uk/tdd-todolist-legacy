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
      status: 'incomplete'
    }

    this.items.push(item)
    return item
  }

  showAll() {
    return this.items
  }

  displayAllItemsText() {
    if (!this.items || this.items.length === 0) return 'No todo items'
    if (this.items.length === 1) {
      return this.items[0].text
    }
    const itemsText = this.items.map((item) => {
      if (item.text.length <= 20) {
        return item.text
      }
      return item.text.slice(0, 20) + '...'
    })
    return itemsText
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

// const todos = new TodoList()
// todos.create('turn the living room heating on!')
// todos.create('Do laundry')
// todos.displayAllItems()
const date = new Date().toISOString().slice(0, 10)
console.log(date)

module.exports = TodoList
