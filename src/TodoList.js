class TodoList {
  constructor() {
    this.id = 0
    this.items = []
  }

  create(str) {
    this.id++
    const item = { id: this.id, text: str, status: 'incomplete', date: new Date().toDateString() }
    this.items.push(item)
    return item
  }


  showAll() {

    console.log("1.) these items", this.items)
    this.items.map((item, index) => {
      console.log("2.) this item inside the map function", item)
      if (item.text.length > 20) {
        console.log("3.) this item has more that 20 char", item.text)
        const newText = item.text.slice(0, 20)
        console.log("4.) this is the cut down text", newText)
        item.text = newText
        console.log("5.) this is the new updated item", item)
        return item
      }
    })
    console.log("6.) Item after map function", this.items)
    return this.items
  }

  setComplete(id) {
    const item = this.findBy(id)
    item.status = 'complete'
    return item
  }

  getByStatus(status) {
    return this.items.filter(item => item.status === status)
  }

  findBy(id) {
    const item = this.items.find(item => item.id === id)
    if (item === undefined) throw new Error('Item not found')
    return item
  }

  deleteBy(id) {
    const item = this.findBy(id)
    const index = this.items.indexOf(item)
    return this.items.splice(index, 1)[0]
  }

  getBydate (item) {
    this.items.filter((item) => item.date.includes())
  }

  // editText (id) {
  //   this.items.map((item) => {
  //   if(item.id === id) {
  //     const newText = "cooked dinner"
  //     item.text = newText
  //     return item
  //   }
  // })
  // return this.items
  // }

 
}

module.exports = TodoList
