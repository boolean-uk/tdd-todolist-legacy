class TodoList {
  constructor() {
    this.id = 0
    this.items = []
  }

  create(str) {
    this.id++
    const item = { id: this.id, text: str, status: 'incomplete' }
    this.items.push(item)
    return item
  }

  showAll() {
    let copy = [...this.items]
    for(let i=0; i <= this.items.length -1; i++) {
      if(this.items[i].text.length > 20 ) {
      copy[i].text = copy[i].text.substring(0,20) + '...'
      }
    }
    return copy
  }


  setComplete(id) {
    const item = this.findBy(id)
    item.status = 'complete'
    return item
  }

  getByStatus(status) {
    let copy = [...this.items]
    for(let i=0; i <= this.items.length -1; i++) {
      if(this.items[i].text.length > 20 ) {
      copy[i].text = copy[i].text.substring(0,20) + '...'
      }
    }
    return copy.filter(((item) => item.status === status))

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
}
let td = new TodoList()
td.create('Do the washing up, you lazy piece of corn')
td.create('Do the washing up, you lazy piece of corn number 2')
td.create('Do the washing up, you lazy piece of corn number 3')
console.log('td', td)
console.log("all", td.showAll())

module.exports = TodoList
