class TodoList {
  constructor() {
    this.id = 0
    this.items = []
  }

  create(str, day) {
    this.id++
    const item = { id: this.id, text: str, status: 'incomplete', date: day }
    this.items.push(item)
    return item
  }

  showAll() {
    const charachterlimit = []
    this.items.forEach((item) => {
      charachterlimit.push(item.text.substring(0, 20))
    })
    charachterlimit.forEach((str, index) => {
      str = str + '...'
      this.items[index].text = str
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

  findByDay(day) {
    const itemsArr = this.items.filter((item) => item.date === day)
    // if (itemsArr.length === 0) {
    //   return []
    // } else {
    //   return itemsArr
    // }
    console.log('1, items arra', itemsArr)
    return itemsArr
  }

  deleteBy(id) {
    const item = this.findBy(id)
    const index = this.items.indexOf(item)
    return this.items.splice(index, 1)[0]
  }
}

module.exports = TodoList
