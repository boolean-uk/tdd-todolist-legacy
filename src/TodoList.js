class TodoList {
  constructor() {
    this.id = 0
    this.items = []
  }

  create(str) {
    this.id++
    const todaysDate = new Date()
    const dateString = `${todaysDate.getFullYear()}-${
      todaysDate.getMonth() + 1
    }-${todaysDate.getDate()}`
    const item = {
      id: this.id,
      text: str,
      status: 'incomplete',
      date: dateString
    }
    this.items.push(item)
    return item
  }

  showAll() {
    const findItem20Char = this.items.map((obj) => {
      if (obj.text.length > 20) {
        obj.text = obj.text.slice(0, 20).concat('...')
      }
      return obj
    })
    return findItem20Char
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

  itemByDay(year, month, day){
    const arrayByDay = this.items.filter(obj => {
      return (obj.date = `${year}-${month}-${day}`)
    })
    return arrayByDay
  }
}

module.exports = TodoList
