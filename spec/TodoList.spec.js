const TodoList = require('../src/TodoList.js')

describe('TodoList', () => {
  let todoList

  beforeEach(() => {
    todoList = new TodoList()
  })

  // create(str)
  it('creates a todo item', () => {
    const expected = {
      id: 1,
      text: 'turn the heating on!',
      status: 'incomplete'
    }

    const result = todoList.create('turn the heating on!')
    expect(result).toEqual(expected)
  })

  // showAll()
  it('returns all items', () => {
    const item1 = todoList.create('turn the heating on!')
    const item2 = todoList.create('Do the washing up')
    const expected = [item1, item2]

    expect(todoList.showAll()).toEqual(expected)
  })

  it('returns alone item in full character length', () => {
    const item1 = todoList.create('turn the heating on!')
    const expected = [item1]

    expect(todoList.showAll()).toEqual(expected)
  })

  // setComplete(id)
  it('sets item to be complete if found', () => {
    const item1 = todoList.create('turn the heating on!')
    const expected = item1

    const result = todoList.setComplete(item1.id)
    expect(result).toEqual(expected)
  })

  it('throws error if not found', () => {
    expect(() => todoList.setComplete(1)).toThrowError('Item not found')
  })

  // getByStatus(status)
  it('gets incomplete items', () => {
    const item1 = todoList.create('turn the heating on!')
    const item2 = todoList.create('Do the washing up')
    todoList.setComplete(item1.id)
    const expected = [item2]

    const result = todoList.getByStatus('incomplete')
    expect(result).toEqual(expected)
  })

  it('gets complete items', () => {
    const item1 = todoList.create('turn the heating on!')
    todoList.setComplete(item1.id)
    const expected = [item1]

    const result = todoList.getByStatus('complete')
    expect(result).toEqual(expected)
  })

  // findBy(id)
  it('finds item by id', () => {
    const item1 = todoList.create('turn the heating on!')
    const expected = item1

    const result = todoList.findBy(item1.id)
    expect(result).toEqual(expected)
  })

  it('findBy throws error if not found', () => {
    expect(() => todoList.findBy(1)).toThrowError('Item not found')
  })

  // deleteBy(id)
  it('deletes item by id', () => {
    const item1 = todoList.create('turn the heating on!')
    const expected = item1
    const deletedItem = todoList.deleteBy(1)

    expect(deletedItem).toEqual(expected)
    expect(todoList.showAll()).toEqual([])
  })

  it('delete throws error if not found', () => {
    expect(() => todoList.deleteBy(1)).toThrowError('Item not found')
  })
})
