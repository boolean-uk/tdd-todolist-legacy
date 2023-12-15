const TodoList = require('../src/TodoList.js')

describe('TodoList', () => {
  let todoList
  let todaysDate

  beforeEach(() => {
    todoList = new TodoList()
    todaysDate = new Date().toISOString().slice(0, 10)
  })
  it('creates a todo item', () => {
    // set up
    const expected = {
      id: 1,
      text: 'turn the heating on!',
      status: 'incomplete',
      date: `${todaysDate}`
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
      date: `${todaysDate}`
    }
    const item2 = {
      id: 2,
      text: 'Do the washing up',
      status: 'incomplete',
      date: `${todaysDate}`
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
      date: `${todaysDate}`
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
      date: `${todaysDate}`
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
      date: `${todaysDate}`
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
  describe('/ display all items method', () => {
    beforeEach(() => {
      todoList = new TodoList()
    })
    it('/ There are multiple items in the list, displaying all items text no longer than 20 characters', () => {
      todoList.items = [
        {
          id: 1,
          text: 'turn the living room heating on!',
          status: 'complete',
          date: `${todaysDate}`
        },
        {
          id: 2,
          text: 'do the laundry',
          status: 'incomplete',
          date: `${todaysDate}`
        },
        {
          id: 3,
          text: 'pet the cat',
          status: 'incomplete',
          date: `${todaysDate}`
        }
      ]
      const result = todoList.displayAllItemsText()
      expect(result).toEqual([
        'turn the living room...',
        'do the laundry',
        'pet the cat'
      ])
    })
    it('/ there is one item in the list and the items length is longer than 20 character. Display entire length', () => {
      todoList.items = [
        {
          id: 1,
          text: 'turn the living room heating on!',
          status: 'complete',
          date: `${todaysDate}`
        }
      ]
      const result = todoList.displayAllItemsText()
      expect(result).toEqual('turn the living room heating on!')
    })
    it('/ if no items exist in items list array', () => {
      const result = todoList.displayAllItemsText()
      expect(result).toEqual('No todo items')
    })
  })
  describe('/ find by date method', () => {
    beforeEach(() => {
      todoList = new TodoList()
      todoList.items = [
        {
          id: 1,
          text: 'turn the living room heating on!',
          status: 'complete',
          date: '2023-12-13'
        },
        {
          id: 2,
          text: 'do the laundry',
          status: 'incomplete',
          date: '2023-12-14'
        },
        {
          id: 3,
          text: 'pet the cat',
          status: 'incomplete',
          date: '2023-12-14'
        },
        {
          id: 4,
          text: 'pet the dog',
          status: 'incomplete',
          date: '2023-12-15'
        }
      ]
    })
    it(' / find todo by date returns a list of todos with the same date as entered in parameter.', () => {
      const expectation = [
        {
          id: 2,
          text: 'do the laundry',
          status: 'incomplete',
          date: '2023-12-14'
        },
        {
          id: 3,
          text: 'pet the cat',
          status: 'incomplete',
          date: '2023-12-14'
        }
      ]
      const result = todoList.findTodoByDate('2023-12-14')
      expect(result).toEqual(expectation)
    })
    it('/ if parameter is left empty', () => {
      const result = todoList.findTodoByDate()
      expect(result).toEqual(
        'Please enter a date using numbers in format of YYYY-MM-DD'
      )
    })
  })
})
