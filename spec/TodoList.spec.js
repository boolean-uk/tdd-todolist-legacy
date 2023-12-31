const TodoList = require('../src/TodoList.js')

describe('TodoList', () => {
  let todoList
  const date = new Date()
  const currentDate = `${date.getFullYear()}/${
    date.getMonth() + 1
  }/${date.getDate()}`

  beforeEach(() => {
    todoList = new TodoList()
  })

  it("item longer than 20 chars ends with '...' on showAll() with more than 2 todos", () => {
    const expected = [
      {
        id: 1,
        text: 'water the dog and pe...',
        status: 'incomplete',
        created: currentDate
      },
      {
        id: 2,
        text: 'water the plants.',
        status: 'incomplete',
        created: currentDate
      }
    ]

    const item1 = todoList.create('water the dog and pet the plants.')
    const item2 = todoList.create('water the plants.')

    const result = todoList.showAll()

    expect(result).toEqual(expected)
  })

  it('item longer than 20 chars shows all text after showAll() with multiple todos', () => {
    const expected = [
      {
        id: 1,
        text: 'water the dog and pe...',
        status: 'incomplete',
        created: currentDate
      },
      {
        id: 2,
        text: 'water the plants.',
        status: 'incomplete',
        created: currentDate
      }
    ]
    const expected2 = {
      id: 1,
      text: 'water the dog and pet the plants.',
      status: 'incomplete',
      created: currentDate
    }

    const item1 = todoList.create('water the dog and pet the plants.')
    const item2 = todoList.create('water the plants.')

    const result = todoList.showAll()
    const result2 = todoList.findBy(1)

    expect(result).toEqual(expected)
    expect(result2).toEqual(expected2)
  })

  it('item longer than 20 chars shows all text on showAll() with 1 todo', () => {
    const expected = [
      {
        id: 1,
        text: 'water the dog and pet the plants.',
        status: 'incomplete',
        created: currentDate
      }
    ]

    const item = todoList.create('water the dog and pet the plants.')

    const result = todoList.showAll()

    expect(result).toEqual(expected)
  })

  it('gets by date with todos', () => {
    const expected = [
      {
        id: 1,
        text: 'water the dog and pe...',
        status: 'incomplete',
        created: currentDate
      },
      {
        id: 2,
        text: 'water the plants.',
        status: 'incomplete',
        created: currentDate
      }
    ]

    const item1 = todoList.create('water the dog and pet the plants.')
    const item2 = todoList.create('water the plants.')

    const result = todoList.getByDate(currentDate)

    expect(result).toEqual(expected)
  })

  it('gets by date without todos', () => {
    const expected = 'There are no Todos on that date'

    const result = todoList.getByDate(currentDate)

    expect(result).toEqual(expected)
  })

  it('is empty', () => {
    const expected = 'TodoList is empty'

    const result = todoList.showAll()

    expect(result).toEqual(expected)
  })

  it('creates a todo item', () => {
    // set up
    const expected = {
      id: 1,
      text: 'turn the heating on!',
      status: 'incomplete',
      created: currentDate
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
      created: currentDate
    }
    const item2 = {
      id: 2,
      text: 'Do the washing up',
      status: 'incomplete',
      created: currentDate
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
      created: currentDate
    }

    // execute
    const result = todoList.setComplete(item1.id)

    // verify
    expect(result).toEqual(expected)
  })

  it('sets item to be incomplete if found', () => {
    // set up
    const item1 = todoList.create('turn the heating on!')
    const expected = {
      id: 1,
      text: 'turn the heating on!',
      status: 'incomplete',
      created: currentDate
    }

    // execute
    const given = todoList.setComplete(item1.id)
    const result = todoList.setIncomplete(item1.id)

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
      created: currentDate
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
      created: currentDate
    }

    // execute
    const deletedItem = todoList.deleteBy(1)

    // verify
    expect(deletedItem).toEqual(expected)
    expect(todoList.showAll()).toEqual('TodoList is empty')
  })

  it('delete throws error if not found', () => {
    // set up

    // execute, verify
    expect(() => todoList.deleteBy(1)).toThrowError('Item not found')
  })

  it("updates text and returns todo's text", () => {
    const item1 = todoList.create('feed the tiger')
    const expected = {
      id: 1,
      text: 'feed the cat',
      status: 'incomplete',
      created: currentDate
    }

    const result = todoList.updateText('feed the cat', 1)

    expect(result).toEqual(expected)
  })

  it('update text throws error for invalid input', () => {
    const item1 = todoList.create('feed the tiger')

    expect(() => todoList.updateText(['updated text'], 1)).toThrowError(
      "Please input a valid string & number e.g. ('Water the plants',1)"
    )
  })
})
