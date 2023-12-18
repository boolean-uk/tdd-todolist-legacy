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
      status: 'incomplete'
    }

    // execute
    const result = todoList.create('turn the heating on!')

    // verify
    expect(result).toEqual(expected)
  })

  it('returns all items', () => {
    // set up

    const expected = [
      {
        id: 1,
        text: 'turn the heating on!',
        status: 'incomplete'
      },
      {
        id: 2,
        text: 'Do the washing up',
        status: 'incomplete'
      }
    ]

    // execute
    todoList.create('turn the heating on!')
    todoList.create('Do the washing up')

    // verify
    expect(todoList.showAll()).toEqual(expected)
  })

  describe('sets the status of the item', () => {
    it('sets item to be complete if found', () => {
      // set up
      const item1 = todoList.create('turn the heating on!')
      const expected = {
        id: 1,
        text: 'turn the heating on!',
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
  })

  describe('gets items by status', () => {
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
  })

  describe('Finds items by id', () => {
    it('finds item by id', () => {
      // set up
      const item1 = todoList.create('turn the heating on!')
      const expected = {
        id: 1,
        text: 'turn the heating on!',
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
  })

  describe('delete item by id', () => {
    it('deletes item by id', () => {
      // set up
      const item1 = todoList.create('turn the heating on!')
      const expected = {
        id: 1,
        text: 'turn the heating on!',
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
  })
})
