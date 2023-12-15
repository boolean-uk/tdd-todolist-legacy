class TodoList {
  constructor () {
    this.id = 0
    this.items = []
    this.itemsShortText = []
  }

  create (str) {
    this.id++
    const item = { id: this.id, text: str, status: 'incomplete', date: new Date().toLocaleDateString() }
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

  getByDate(date) {
    const checkDateArr = this.items.filter(item => item.date === date)
    // if array is empty, i.e. no valid date found
    if (checkDateArr.length === 0) return 'Item not found, search by date format DD/MM/YYYY'
    // else check if there are multiple todos w/ same date
    else {
      // only one todo - return todo with full length text
      if (checkDateArr.length === 1) {
        return checkDateArr
        // multiple todos - return all todos with this date with shortened text
      } else {
        return this.showAll().filter(item => item.date === date)
      }
    }
  }
}

module.exports = TodoList
