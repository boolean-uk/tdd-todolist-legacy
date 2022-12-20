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
      date: new Date().toLocaleDateString('en-GB')
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
      status: 'incomplete',
      date: new Date().toLocaleDateString('en-GB')
    }
    const item2 = {
      id: 2,
      text: 'Do the washing up',
      status: 'incomplete',
      date: new Date().toLocaleDateString('en-GB')
    }
    const expected = [item1, item2]

    // execute
    todoList.create('turn the heating on!')
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
      date: new Date().toLocaleDateString('en-GB')
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
    todoList.create('Do the washing up')
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
      date: new Date().toLocaleDateString('en-GB')
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
      date: new Date().toLocaleDateString('en-GB')
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

  it('should return whole item if items list is only 1 item long', () => {
    todoList.create('Feed the cats')

    expect(todoList.showAll()).toEqual([
      {
        id: 1,
        text: 'Feed the cats',
        status: 'incomplete',
        date: new Date().toLocaleDateString('en-GB')
      }
    ])
  })

  it('should display first 20 characters of each item on to-do list', () => {
    todoList.create('Finish 20 char excercise on to-do list')
    todoList.create('Feed the cats')

    expect(todoList.showAll()).toEqual([
      {
        id: 1,
        text: 'Finish 20 char excer...',
        status: 'incomplete',
        date: new Date().toLocaleDateString('en-GB')
      },
      {
        id: 2,
        text: 'Feed the cats',
        status: 'incomplete',
        date: new Date().toLocaleDateString('en-GB')
      }
    ])
  })
  it('should return all items with same date of creation', () => {
    todoList.create('turn the heating on!')
    todoList.create('Do the washing up')

    expect(todoList.showAll()).toEqual([
      {
        id: 1,
        text: 'turn the heating on!',
        status: 'incomplete',
        date: new Date().toLocaleDateString('en-GB')
      },
      {
        id: 2,
        text: 'Do the washing up',
        status: 'incomplete',
        date: new Date().toLocaleDateString('en-GB')
      }
    ])
  })
})
