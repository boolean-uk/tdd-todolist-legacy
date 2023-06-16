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
      date: new Date().toLocaleDateString('en-GB')
    }
    this.items.push(item)
    return item
  }

  showAll() {
    const copyOfItems = [...this.items]
    for (let i = 0; i <= this.items.length - 1; i++) {
      if (this.items[i].text.length > 20) {
        copyOfItems[i].text = copyOfItems[i].text.substring(0, 20) + '...'
      }
    }
    return copyOfItems
  }

  setComplete(id) {
    const item = this.findBy(id)
    item.status = 'complete'
    return item
  }

  getByStatus(status) {
    const copyOfItems = [...this.items]
    for (let i = 0; i <= this.items.length - 1; i++) {
      if (this.items[i].text.length > 20) {
        copyOfItems[i].text = copyOfItems[i].text.substring(0, 20) + '...'
      }
    }
    return copyOfItems.filter((item) => item.status === status)
  }

  findBy(id) {
    const item = this.items.find((item) => item.id === id)
    if (item === undefined) throw new Error('Item not found')
    return item
  }

  findByDate(date) {
    const item = this.items.find((item) => item.date === date)
    if (item === undefined) return []

    return item
  }

  deleteBy(id) {
    const item = this.findBy(id)
    const index = this.items.indexOf(item)
    return this.items.splice(index, 1)[0]
  }
}

module.exports = TodoList

const todoList = new TodoList()
todoList.create(
  'The North-West National Vice Chairman of the All Progressives Congress, Salihu Lukman, has raised the alarm that the National Chairman, Senator Abdullahi Adamu, is running the ruling party like an army barrack without recourse to the National Working Committee.'
)

todoList.create(
  'This was even as the Kaduna politician expressed concerns that the day-to-day administration of the secretariat and key decisions that involve party activities are taken at the discretion of the national chairman.'
)
console.log(todoList.showAll())
