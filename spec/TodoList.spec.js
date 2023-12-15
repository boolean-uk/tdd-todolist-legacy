const TodoList = require('../src/TodoList.js')

describe('TodoList', () => {
  let todoList
  let currentDate

  beforeEach(() => {
    todoList = new TodoList()
    currentDate = new Date().toISOString().slice(0, 10)
  })

  it('creates a todo item', () => {
    // set up
    const expected = {
      id: 1,
      text: 'turn the heating on!',
      status: 'incomplete',
      date: `${currentDate}`
    }

    // execute
    const result = todoList.create('turn the heating on!')

    // verify
    expect(result).toEqual(expected)
  })

  it('returns all items', () => {
    // set up
    const item1 = todoList.create('turn the heating on!')
    const item2 = todoList.create('Do the washing up')
    const expected = [item1, item2]
    // execute
    const result = todoList.getAll()
    // verify
    expect(result).toEqual(expected)
  })

  it('display all summaries', () => {
    // set up
    todoList.create('turn the heating on!')
    todoList.create('Do the washing up')
    // execute
    const result = todoList.displayAllSummaries()
    // verify
    expect(result).toEqual(['turn the heating on!...', 'Do the washing up...'])
  })

  it('sets item to be complete if found', () => {
    // set up
    const item1 = todoList.create('turn the heating on!')
    const expected = {
      id: 1,
      text: 'turn the heating on!',
      status: 'complete',
      date: `${currentDate}`
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
      date: `${currentDate}`
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
    todoList.create('turn the heating on!')
    const expected = {
      id: 1,
      text: 'turn the heating on!',
      status: 'incomplete',
      date: `${currentDate}`
    }

    // execute
    const deletedItem = todoList.deleteBy(1)

    // verify
    expect(deletedItem).toEqual(expected)
    expect(todoList.getAll()).toEqual([])
  })

  it('delete throws error if not found', () => {
    // set up

    // execute, verify
    expect(() => todoList.deleteBy(1)).toThrowError('Item not found')
  })

  it('display item summary', () => {
    // set up
    const item1 = todoList.create('buy Christmas presents for the in-laws')
    // execute
    const result = todoList.displaySummary(item1)
    // verify
    expect(result).toEqual('buy Christmas presen...')
  })

  it('finds items by their date', () => {
    const item1 = {
      id: 1,
      text: 'turn the heating on!',
      status: 'incomplete',
      date: '2021-20-28'
    }
    const item2 = {
      id: 2,
      text: 'do the washing up',
      status: 'incomplete',
      date: '1992-01-04'
    }
    const item3 = {
      id: 3,
      text: 'feed the dog',
      status: 'incomplete',
      date: '2023-28-11'
    }
    const item4 = {
      id: 4,
      text: 'tidy up',
      status: 'incomplete',
      date: '1992-01-04'
    }
    todoList.items.push(item1)
    todoList.items.push(item2)
    todoList.items.push(item3)
    todoList.items.push(item4)

    const result = todoList.findByDate('1992-01-04')
    expect(result).toEqual([item2, item4])
  })

  it('no items match this date', () => {
    const item1 = {
      id: 1,
      text: 'turn the heating on!',
      status: 'incomplete',
      date: '2021-20-28'
    }
    const item2 = {
      id: 2,
      text: 'do the washing up',
      status: 'incomplete',
      date: '1992-01-04'
    }
    const item3 = {
      id: 3,
      text: 'feed the dog',
      status: 'incomplete',
      date: '2023-28-11'
    }
    const item4 = {
      id: 4,
      text: 'tidy up',
      status: 'incomplete',
      date: '1992-01-04'
    }
    todoList.items.push(item1)
    todoList.items.push(item2)
    todoList.items.push(item3)
    todoList.items.push(item4)

    const result = todoList.findByDate('2007-11-23')
    expect(result).toEqual([])
  })
})
