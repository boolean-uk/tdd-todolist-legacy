const TodoList = require('../src/TodoList.js')

describe('TodoList', () => {
  let todoList

  beforeEach(() => {
    todoList = new TodoList()
  })

  it('creates a todo item', () => {
    // set up
    const expected = {
      id: 1,
      text: 'turn the heating on!',
      status: 'incomplete',
      date: '15 Dec 2023'
    }

    // execute
    const result = todoList.create('turn the heating on!')

    // verify
    expect(result).toEqual(expected)
  })

  // TODO: test for incrementing id
  // TODO: test item is added to array

  it('returns all items', () => {
    // set up
    const item1 = {
      id: 1,
      text: 'turn the heating on ...',
      status: 'incomplete',
      date: '15 Dec 2023'
    }
    const item2 = {
      id: 2,
      text: 'Do the washing up',
      status: 'incomplete',
      date: '15 Dec 2023'
    }
    const expected = [item1, item2]

    // execute
    todoList.create('turn the heating on to be very hot!')
    todoList.create('Do the washing up')

    // verify
    expect(todoList.showAll()).toEqual(expected)
  })

  it('sets item to be complete if found', () => {
    // set up
    const item1 = todoList.create('turn the heating on!')
    const expected = {
      id: 1,
      text: 'turn the heating on!',
      status: 'complete',
      date: '15 Dec 2023'
    }

    // execute
    const result = todoList.setComplete(item1.id)

    // verify
    expect(result).toEqual(expected)
  })

  it('throws error if not found', () => {
    // set up

    // execute, verify
    expect(() => todoList.setComplete(1)).toThrowError('Item not found')
  })

  it('gets incomplete items', () => {
    // set up
    const item1 = todoList.create('turn the heating on!')
    const item2 = todoList.create('Do the washing up')
    todoList.setComplete(item1.id)
    const expected = [item2]

    // execute
    const result = todoList.getByStatus('incomplete')

    // verify
    expect(result).toEqual(expected)
  })

  it('gets complete items', () => {
    // set up
    const item1 = todoList.create('turn the heating on!')
    const item2 = todoList.create('Do the washing up')
    todoList.setComplete(item1.id)
    const expected = [item1]

    // execute
    const result = todoList.getByStatus('complete')

    // verify
    expect(result).toEqual(expected)
  })

  it('finds item by id', () => {
    // set up
    const item1 = todoList.create('turn the heating on!')
    const expected = {
      id: 1,
      text: 'turn the heating on!',
      status: 'incomplete',
      date: '15 Dec 2023'
    }

    // execute
    const result = todoList.findBy(item1.id)

    // verify
    expect(result).toEqual(expected)
  })

  it('findBy throws error if not found', () => {
    // set up

    // execute, verify
    expect(() => todoList.findBy(1)).toThrowError('Item not found')
  })

  it('deletes item by id', () => {
    // set up
    const item1 = todoList.create('turn the heating on!')
    const expected = {
      id: 1,
      text: 'turn the heating on!',
      status: 'incomplete',
      date: '15 Dec 2023'
    }

    // execute
    const deletedItem = todoList.deleteBy(1)

    // verify
    expect(deletedItem).toEqual(expected)
    expect(todoList.showAll()).toEqual([])
  })

  it('delete throws error if not found', () => {
    // set up

    // execute, verify
    expect(() => todoList.deleteBy(1)).toThrowError('Item not found')
  })

  it('get items by date', () => {
    const item1 = todoList.create("today's date")
    const item2 = todoList.create("not today's date")
    item2.date = '17 Dec 2023'

    const result = todoList.getByDate('15 Dec 2023')

    expect(result).toEqual([item1])
  })

  it('return no items if no matching date', () => {
    todoList.create("not today's date")
    todoList.create("also not today's date")

    const result = todoList.getByDate('25 Dec 2023')
    expect(result).toEqual([])
  })
})
