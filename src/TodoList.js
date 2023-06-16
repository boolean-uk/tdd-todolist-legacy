class TodoList {
  constructor() {
    this.id = 0;
    this.items = [];
  }

  create(str) {
    this.id++;
    const item = { id: this.id, text: str, status: 'incomplete', date: new Date().toISOString().split('T')[0] };
    this.items.push(item);
    return item;
  }

  showAll() {
    return this.items;
  }

  setComplete(id) {
    const item = this.findBy(id);
    item.status = 'complete';
    return item;
  }

  getByStatus(status) {
    return this.items.filter(item => item.status === status);
  }

  findBy(id) {
    const item = this.items.find(item => item.id === id);
    if (item === undefined) throw new Error('Item not found');
    return item;
  }

  deleteBy(id) {
    const item = this.findBy(id);
    const index = this.items.indexOf(item);
    return this.items.splice(index, 1)[0];
  }

  editText(id, newText) {
    const item = this.findBy(id);
    item.text = newText;
    return item;
  }

  showAllTruncated() {
    return this.items.map(item => {
      return {
        ...item,
        text: item.text.length > 20 ? item.text.slice(0, 20) + '...' : item.text
      };
    });
  }

  searchByDay(date) {
    return this.items.filter(item => item.date === date);
  }
}

module.exports = TodoList;
