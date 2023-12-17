class TodoList {
  constructor() {
    this.id = 0
    this.items = []
  }

  create(str) {
    const getDate = new Date()
    const getYear = getDate.getFullYear()
    const getMonth = getDate.getMonth() + 1
    const getDay = getDate.getDate()
    const getDateString = `${getYear}-${getMonth}-${getDay}`
    this.id++
    const item = {
      id: this.id,
      text: str,
      status: 'incomplete',
      getDate: getDateString
    }
    this.items.push(item)
    return item
  }

  showAll() {
    this.items.forEach((item) => {
      if (item.text.length > 20) {
        item.text = item.text.slice(0, 20).concat('...')
      }
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
  findTheDate(getDate) {
    return this.items.filter((item) => item.getDate === getDate)
  }
}

const getTodoList = new TodoList()
console.log(getTodoList.create('do the exercises '))
console.log(getTodoList.create('do the house chores'))
console.log('show the method', getTodoList.showAll)
console.log('find the date method', getTodoList.findTheDate('2023-12-17'))

module.exports = TodoList
