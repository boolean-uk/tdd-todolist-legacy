class TodoList {
  constructor() {
    this.id = 0
    this.items = []
    this.date = new Date().toLocaleDateString('en-GB')
  }

  create(str) {
    this.id++
    const item = {
      id: this.id,
      text: str,
      status: 'incomplete',
      date: this.date
    }
    this.items.push(item)
    return item
  }
  // to create a to-do item id id incremented by one
  // item has new id + text input + default status of incomplete
  // push new item into to-do list + is returned

  showAll() {
    if (this.items.length === 1) {
      return this.items
    }
    return this.twentyCharsMax()
  }
  // returns all to-do items

  twentyCharsMax() {
    const newItemsList = this.items.map((item) => {
      if (item.text.length > 20) {
        return { ...item, text: `${item.text.substring(0, 20)}...` }
      }
      return item
    })

    return newItemsList
  }
  // maps through items list + if item text is longer than 20 cuts it off + ...is interpolated
  // If items chars a re less than 20 , item is returned

  setComplete(id) {
    const item = this.findBy(id)
    item.status = 'complete'
    return item
  }
  // findBy item is called + specific item id is found
  // status for that id is set to complete

  getByStatus(status) {
    return this.items.filter((item) => item.status === status)
  }
  // filters through all items to find all items with specific status

  findBy(id) {
    const item = this.items.find((item) => item.id === id)
    if (item === undefined) throw new Error('Item not found')
    return item
  }
  // an example of placing single purpose logic into a smaller function to call later
  // this function is used in setComplete() and deleteBy()

  deleteBy(id) {
    const item = this.findBy(id)
    const index = this.items.indexOf(item)
    return this.items.splice(index, 1)[0]
  }
}
// uses findby to find correct item to delete
// splice is then used to remove specific to-do item from item list

module.exports = TodoList

// new Date().toLocaleDateString()
// .toLocaleDateString("en-GB")
// syntax for GB time ^
