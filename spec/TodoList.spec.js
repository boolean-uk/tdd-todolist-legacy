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
      createdAt: new Date('2022-12-21T09:38:36.904Z')
    }

    // execute
    const result = todoList.create(
      'turn the heating on!',
      new Date('2022-12-21T09:38:36.904Z')
    )

    // verify
    expect(result).toEqual(expected)
  })

  it('returns all items', () => {
    // set up
    const item1 = {
      id: 1,
      text: 'turn the heating on!',
      status: 'incomplete',
      createdAt: new Date('2022-12-21T09:38:36.904Z')
    }
    const expected = [
      item1,
      {
        id: 2,
        text: 'Do the washing up!!!...',
        status: 'incomplete',
        createdAt: new Date('2022-12-21T09:38:36.904Z')
      }
    ]

    // execute
    todoList.create(
      'turn the heating on!',
      new Date('2022-12-21T09:38:36.904Z')
    )
    todoList.create(
      'Do the washing up!!!!',
      new Date('2022-12-21T09:38:36.904Z')
    )

    // verify
    expect(todoList.showAll()).toEqual(expected)
  })

  it('sets item to be complete if found', () => {
    // set up
    const item1 = todoList.create(
      'turn the heating on!',
      new Date('2022-12-21T09:38:36.904Z')
    )
    const expected = {
      id: 1,
      text: 'turn the heating on!',
      status: 'complete',
      createdAt: new Date('2022-12-21T09:38:36.904Z')
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
    const item1 = todoList.create(
      'turn the heating on!',
      new Date('2022-12-21T09:38:36.904Z')
    )
    const expected = {
      id: 1,
      text: 'turn the heating on!',
      status: 'incomplete',
      createdAt: new Date('2022-12-21T09:38:36.904Z')
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
    const item1 = todoList.create(
      'turn the heating on!',
      new Date('2022-12-21T09:38:36.904Z')
    )
    const expected = {
      id: 1,
      text: 'turn the heating on!',
      status: 'incomplete',
      createdAt: new Date('2022-12-21T09:38:36.904Z')
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

  it('should find todo items by day', () => {
    const item1 = todoList.create(
      'Do something on wednesday',
      new Date('2022-12-21T09:38:36.904Z')
    )
    const item2 = todoList.create(
      'Do something on Tuesday',
      new Date('2022-12-20T09:38:36.904Z')
    )
    const item3 = todoList.create(
      'Do another thing on wednesday',
      new Date('2022-12-21T09:38:36.904Z')
    )

    const result = todoList.findByDay('Wednesday')

    expect(result).toEqual([
      {
        id: 1,
        text: 'Do something on wednesday',
        status: 'incomplete',
        createdAt: new Date('2022-12-21T09:38:36.904Z')
      },
      {
        id: 3,
        text: 'Do another thing on wednesday',
        status: 'incomplete',
        createdAt: new Date('2022-12-21T09:38:36.904Z')
      }
    ])
  })
})
