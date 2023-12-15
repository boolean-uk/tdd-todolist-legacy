const TodoList = require('../src/TodoList.js')

describe('TodoList', () => {
  let todoList

  beforeEach(() => {
    todoList = new TodoList()
  })

  it('creates a todo item', () => {
    const expected = {
      id: 1,
      text: 'turn the heating on!',
      status: 'incomplete',
      date: new Date().toDateString()
    }

    const result = todoList.create('turn the heating on!')

    expect(result).toEqual(expected)
  })

  it('returns all items', () => {
    const item1 = {
      id: 1,
      text: 'turn the heating on ...',
      status: 'incomplete',
      date: new Date().toDateString()
    }
    const item2 = {
      id: 2,
      text: 'Do the washing up',
      status: 'incomplete',
      date: new Date().toDateString()
    }
    const expected = [item1, item2]

    todoList.create('turn the heating on if it is cold!')
    todoList.create('Do the washing up')

    expect(todoList.showAll()).toEqual(expected)
  })

  it('sets item to be complete if found', () => {
    const item1 = todoList.create('turn the heating on!')
    const expected = {
      id: 1,
      text: 'turn the heating on!',
      status: 'complete',
      date: new Date().toDateString()
    }

    const result = todoList.setComplete(item1.id)

    expect(result).toEqual(expected)
  })

  it('toggles item status', () => {
    const item1 = todoList.create('turn the heating on!')
    todoList.setComplete(item1.id)
    const expected = {
      id: 1,
      text: 'turn the heating on!',
      status: 'incomplete',
      date: new Date().toDateString()
    }
    const result = todoList.toggleStatus(item1.id)
    expect(result).toEqual(expected)
  })

  it('throws error if not found', () => {
    expect(() => todoList.setComplete(1)).toThrowError('Item not found')
  })

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
    todoList.create('Do the washing up')
    todoList.setComplete(item1.id)
    const expected = [item1]

    const result = todoList.getByStatus('complete')

    expect(result).toEqual(expected)
  })

  it('finds item by id', () => {
    const item1 = todoList.create('turn the heating on!')
    const expected = {
      id: 1,
      text: 'turn the heating on!',
      status: 'incomplete',
      date: new Date().toDateString()
    }

    const result = todoList.findBy(item1.id)

    expect(result).toEqual(expected)
  })

  it('findBy throws error if not found', () => {
    expect(() => todoList.findBy(1)).toThrowError('Item not found')
  })

  it('deletes item by id', () => {
    todoList.create('turn the heating on!')
    const expected = {
      id: 1,
      text: 'turn the heating on!',
      status: 'incomplete',
      date: new Date().toDateString()
    }
    const deletedItem = todoList.deleteBy(1)

    expect(deletedItem).toEqual(expected)
    expect(todoList.showAll()).toEqual([])
  })

  it('delete throws error if not found', () => {
    expect(() => todoList.deleteBy(1)).toThrowError('Item not found')
  })

  it('gets item list created on specific date', () => {
    todoList.create('turn the heating on!')
    const expected = [
      {
        id: 1,
        text: 'turn the heating on!',
        status: 'incomplete',
        date: new Date().toDateString()
      }
    ]
    expect(todoList.getByDate('tue')).toEqual(expected)
    expect(todoList.getByDate('mon')).toEqual([])
  })

  it('edits text of item', () => {
    todoList.create('edit if you dare mate :( ')
    const expected = [
      {
        id: 1,
        text: 'no way I dont dare',
        status: 'incomplete',
        date: new Date().toDateString()
      }
    ]
    expect(todoList.editText(1, 'no way I dont dare')).toEqual(expected)
  })
})
