const date = new Date()
const currentDate = `${date.getFullYear()}/${
  date.getMonth() + 1
}/${date.getDate()}`

class TodoList {
  constructor() {
    this.id = 0
    this.items = []
  }

  concatText() {
    if (this.items.length > 1) {
      return this.items.map((item) => ({
        ...item,
        text: item.text.length > 20 ? item.text.slice(0, 20) + '...' : item.text
      }))
    }

    return this.items
  }

  create(str) {
    this.id++
    const item = {
      id: this.id,
      text: str,
      status: 'incomplete',
      created: currentDate
    }
    this.items.push(item)
    return item
  }

  showAll() {
    const items = this.concatText()

    if (this.items.length === 0) {
      return 'TodoList is empty'
    } else {
      return items
    }
  }

  setComplete(id) {
    const item = this.findBy(id)
    item.status = 'complete'
    return item
  }

  setIncomplete(id) {
    const item = this.findBy(id)
    item.status = 'incomplete'
    return item
  }

  getByDate(date) {
    const items = this.concatText()

    if (date === undefined) {
      throw new Error('Please input a date')
    } else if (typeof date !== 'string') {
      throw new Error("Please input a valid date e.g. '2023/6/14'")
    }

    const isValid = items.some((item) => item.created === date)

    if (isValid) {
      return items.filter((item) => item.created === date)
    } else {
      return 'There are no Todos on that date'
    }
  }

  getByStatus(status) {
    const items = this.concatText()
    return items.filter((item) => item.status === status)
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

  updateText(newText, id) {
    const item = this.findBy(id)

    if (typeof newText !== 'string' || typeof id !== 'number') {
      throw new Error(
        "Please input a valid string & number e.g. ('Water the plants',1)"
      )
    }

    item.text = newText

    return item
  }
}

module.exports = TodoList
