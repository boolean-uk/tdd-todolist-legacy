class TodoList {
  constructor () {
    this.id = 0
    this.items = []
  }


  create(str, date = "05-08-2023") {
    if (str.length > 20 && this.items.length !== 0) {
      const shortenedText = `${str.substring(0, 20)}...`;

      this.id++;
      const item = { id: this.id, text: shortenedText, status: 'incomplete', date : date };
      this.items.push(item);
      return item;

    } else {
      this.id++;
      const item = { id: this.id, text: str, status: 'incomplete', date : date };
      this.items.push(item);
      return item;
    }
  }


  showAll () {
    return this.items
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

  searchByDate(date){
    return this.items.find((item)=> item.date === date)
  }
}


module.exports = TodoList
