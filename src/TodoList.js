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
      date: new Date().toDateString()
    }
    this.items.push(item)
    return item
  }

  showAll() {
    const cutItems = [...this.items]
    for (const item of cutItems) {
      if (item.text.length > 20) {
        item.text = item.text.substring(0, 20).concat('...')
      }
    }

    return cutItems
  }

  setComplete(id) {
    const item = this.findBy(id)
    item.status = 'complete'
    return item
  }

  toggleStatus(id) {
    const item = this.findBy(id)
    item.status === 'complete'
      ? (item.status = 'incomplete')
      : (item.status = 'complete')

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

  filterByDay(day) {
    const item = this.items.filter((item) => item.date.includes(day))
    if (item === undefined) throw new Error('Item not found')
    return item
  }

  deleteBy(id) {
    const item = this.findBy(id)
    const index = this.items.indexOf(item)
    return this.items.splice(index, 1)[0]
  }
}

const testClass = new TodoList()
testClass.create('turn the heating on!')
testClass.create('turn the heating off!')
testClass.create('turn the heating on again you imbecile, what are you doing?!')
console.log(testClass.items)

module.exports = TodoList
