const date = new Date()

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
      date:
        date.getFullYear().toString() +
        '-' +
        (date.getMonth() + 1).toString() +
        '-' +
        date.getDate().toString()
    }
    this.items.push(item)
    return item
  }

  concatString() {
    this.items.forEach((obj) => {
      let newString = ''
      if (obj.text.length > 20) {
        for (let i = 0; i < 20; i++) {
          newString += obj.text[i]
        }
        newString += '...'
        obj.text = newString
      }
    })
  }

  showAll() {
    this.concatString()
    return this.items
  }

  setComplete(id) {
    const item = this.findBy(id)
    item.status = 'complete'
    return item
  }

  getByStatus(status) {
    this.concatString()
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

  showByDate(todoDate) {
    this.concatString()
    return this.items.filter((item) => item.date === todoDate)
  }
}

module.exports = TodoList
