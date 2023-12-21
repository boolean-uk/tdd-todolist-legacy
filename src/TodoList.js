let id = 1

const setId = (value) => {
  id = value
}

class TodoItem {
  constructor(str) {
    this.id = id
    this.text = str
    this.status = 'incomplete'
    this.date = new Date().toLocaleDateString()
    setId(id +1)
  }
}

class TodoList {
  constructor () {
    this.id = 0
    this.items = []
    this.itemsShortText =[]
  }

    create(item) {
      const itemToCreate = { id: item.id, text: item.text, status: item.status, date: item.date }
      this.items.push(itemToCreate)
      return itemToCreate
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
    if (item.status === 'incomplete') {
      item.status = 'complete'
    }
    else item.status = 'incomplete'
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
      if (checkDateArr.length === 1) return checkDateArr
      // multiple todos - return all todos with this date with shortened text
      else return this.showAll().filter(item => item.date === date)
    }
  }

  updateText(id, text) {
    const itemToUpdate = this.items.find(item => item.id === id)
    if (itemToUpdate === undefined || typeof text !== 'string') throw new Error ('unable to process, make sure id is an Integer and text is a String')
    itemToUpdate.text = text
    return itemToUpdate
  }
}

module.exports = {TodoList, TodoItem, setId}
