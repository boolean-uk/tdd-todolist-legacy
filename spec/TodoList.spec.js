const TodoList = require('../src/TodoList.js')

describe('TodoList', () => {
  let todoList

  beforeEach(() => {
    todoList = new TodoList()
  })
  const getDate = new Date()
  const getYear = getDate.getFullYear()
  const getMonth = getDate.getMonth() + 1
  const getDay = getDate.getDate()
  const getDateString = `${getYear}-${getMonth}-${getDay}`

  it('creates a todo item', () => {
    // set up
    const expected = {
      id: 1,
      text: 'clean the house!',
      status: 'incomplete',
      getDate: getDateString
    }

    // execute
    const result = todoList.create('clean the house!')

    // verify
    expect(result).toEqual(expected)
  })

  it('returns all items', () => {
    // set up

    const item1 = {
      id: 1,
      text: 'clean the house!',
      status: 'incomplete',
      getDate: getDateString
    }
    const item2 = {
      id: 2,
      text: 'Walk the dog',
      status: 'incomplete',
      getDate: getDateString
    }
    const expected = [item1, item2]

    // execute
    todoList.create('clean the house!')
    todoList.create('Walk the dog')

    // verify
    expect(todoList.showAll()).toEqual(expected)
  })
  it('should return only 20 chars of the text if the text length is longer than 20 chars', () => {
    const expected = [
      {
        id: 1,
        text: 'clean the house!...',
        status: 'incomplete',
        getDate: getDateString
      },
      {
        id: 2,
        text: 'Walk the dog...',
        status: 'incomplete',
        getDate: getDateString
      }
    ]

    todoList.create('clean the house!...')
    todoList.create('Walk the dog...')

    expect(todoList.showAll()).toEqual(expected)
  })

  it('sets item to be complete if found', () => {
    // set up
    const item1 = todoList.create('Clean the house!')
    const expected = {
      id: 1,
      text: 'Clean the house!',
      status: 'complete',
      getDate: getDateString
    }
    // execute
    todoList.setComplete(item1.id)

    // verify
    const result = todoList.getById(item1.id)
    expect(result).toEqual(expected)
  })
  it('throws error if not found when marking as complete', () => {
    // set up

    // execute, verify
    expect(() => todoList.setComplete(1)).toThrowError('Item not found')
  })

  it('gets incomplete items', () => {
    // set up
    const item1 = todoList.create('Clean the house!')
    const item2 = todoList.create('Walk the dog')
    todoList.setComplete(item1.id)
    const expected = [item2]

    // execute
    const result = todoList.getByStatus('incomplete')

    // verify
    expect(result).toEqual(expected)
  })

  it('gets complete items', () => {
    // set up
    const item1 = todoList.create('Clean the house!')
    const item2 = todoList.create('Walk the dog')
    todoList.setComplete(item1.id)
    const expected = [item1]
    // execute
    const result = todoList.getByStatus('complete')

    // verify
    expect(result).toEqual(expected)
  })

  it('finds item by id', () => {
    // set up

    const item1 = todoList.create('Clean the house!')
    const expected = {
      id: 1,
      text: 'Clean the house!',
      status: 'incomplete',
      getDate: getDateString
    }

    // execute

    expect(result).toEqual(expected)
  })

  it('findBy throws error if not found', () => {
    // set up

    // execute, verify
    expect(() => todoList.findBy(1)).toThrowError('Item not found')
  })

  it('deletes item by id', () => {
    // set up
    const item1 = todoList.create('Clean the house!')
    const expected = {
      id: 1,
      text: 'Clean the house!',
      status: 'incomplete',
      getDate: getDateString
    }

    // execute
    expect(todoList.showAll()).toEqual([])
  })

  it('delete throws error if not found', () => {
    // set up

    // execute, verify
    expect(() => todoList.deleteBy(1)).toThrowError('Item not found')
  })

  it('should return itrems created on same day', () => {
    const item1 = todoList.create('Clean the house!')
    const item2 = todoList.create('Walk the dog')

    const expected = [item1, item2]

    expect(todoList.findTheDate(getDateString)).toEqual(expected)
  })

  it('should return empty list if item not found by the date', () => {
    expect(todoList.findTheDate(getDateString)).toEqual([])
  })
})
