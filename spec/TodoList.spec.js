const TodoList = require('../src/TodoList.js')

describe('TodoList', () => {
  let todoList
  const date = new Date().toLocaleDateString('en-gb')

  beforeEach(() => {
    todoList = new TodoList()
  })

  it('creates a todo item', () => {
    // set up
    const expected = {
      id: 1,
      text: 'turn the heating on!',
      date: date,
      status: 'incomplete'
    }

    // execute
    const result = todoList.create('turn the heating on!')

    // verify
    expect(result).toEqual(expected)
  })

  it('returns all items', () => {
    // set up
    const item1 = {
      id: 1,
      text: 'turn the heating on!',
      date: date,
      status: 'incomplete'
    }
    const item2 = {
      id: 2,
      text: 'Do the washing up',
      date: date,
      status: 'incomplete'
    }
    const expected = [item1, item2]

    // execute
    todoList.create('turn the heating on!')
    todoList.create('Do the washing up')

    // verify
    expect(todoList.showAll()).toEqual(expected)
  })

  it('returns first 20 characters + ... of items', () => {
    // Setup
    const item1 = {
      id: 1,
      text: 'turn the heating on!',
      date: date,
      status: 'incomplete'
    }
    const item2 = {
      id: 2,
      text: 'This item is more th...',
      date: date,
      status: 'incomplete'
    }
    const expected = [item1, item2]

    // Execution
    todoList.create('turn the heating on!')
    todoList.create('This item is more than 20 characters')

    // Check
    expect(todoList.showAll()).toEqual(expected)
  })

  it('returns the full item for > 20 character items if only showing a single item', () => {
    // Setup
    const item1 = {
      id: 1,
      text: 'This item is more than 20 characters',
      date: date,
      status: 'incomplete'
    }
    const expected = [item1]

    // Execution
    todoList.create('This item is more than 20 characters')

    // Check
    expect(todoList.showAll()).toEqual(expected)
  })

  it('sets item to be complete if found', () => {
    // set up
    const item1 = todoList.create('turn the heating on!')
    const expected = {
      id: 1,
      text: 'turn the heating on!',
      date: date,
      status: 'complete'
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
      date: date,
      status: 'incomplete'
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
      date: date,
      status: 'incomplete'
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

  it('findByDate returns items that match the searched date', () => {
    // Setup
    const item1 = todoList.create('turn the heating on!')
    const item2 = {
      id: 2,
      text: 'Do the washing up',
      date: '15/06/2023',
      status: 'incomplete'
    }
    todoList.items.push(item2)
    const expected = [item1]

    // Execution
    const dateItems = todoList.findByDate(date)

    // Check
    expect(dateItems).toEqual(expected)
  })

  it('findByDate returns empty list if no items have searched date', () => {
    // Setup
    const item1 = todoList.create('turn the heating on!')
    const expected = []

    // Execution
    const dateItems = todoList.findByDate('12/03/2023')

    // Check
    expect(dateItems).toEqual(expected)
  })
})

// eslint-disable-next-line prettier/prettier
/*
describe('', () => {
  it('', () => {
    // Setup
    // Execution
    // Check
  })
})
*/
