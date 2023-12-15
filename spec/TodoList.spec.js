const { TodoList, TodoItem } = require('../src/TodoList.js')

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
      dateCreated: new Date().toLocaleDateString(),
      name: 'joel'
    }

    // execute
    const result = todoList.create('turn the heating on!', 'joel')

    // verify
    expect(result).toEqual(jasmine.objectContaining(expected))
  })

  it('returns all items', () => {
    // set up
    const item1 = {
      id: 1,
      text: 'turn the heating on!',
      status: 'incomplete',
      dateCreated: new Date().toLocaleDateString(),
      name: 'bob'
    }
    const item2 = {
      id: 2,
      text: 'Do the washing up',
      status: 'incomplete',
      dateCreated: new Date().toLocaleDateString(),
      name: 'bob'
    }
    const expected = [item1, item2]

    // execute
    todoList.create('turn the heating on!', 'bob')
    todoList.create('Do the washing up', 'bob')

    // verify
    expect(todoList.showAll()).toEqual(expected)
  })

  it('sets item to be complete if found', () => {
    // set up
    const item1 = todoList.create('turn the heating on!', 'joel')
    const expected = {
      id: 1,
      text: 'turn the heating on!',
      status: 'complete',
      dateCreated: new Date().toLocaleDateString(),
      name: 'joel'
    }

    // execute
    const result = todoList.setComplete(item1.id)

    // verify
    expect(result).toEqual(jasmine.objectContaining(expected))
  })

  it('throws error if not found', () => {
    // set up

    // execute, verify
    expect(() => todoList.setComplete(1)).toThrowError('Item not found')
  })

  it('gets incomplete items', () => {
    // set up
    const item1 = todoList.create('turn the heating on!', 'sarah')
    const item2 = todoList.create('Do the washing up', 'sarah')
    todoList.setComplete(item1.id)
    const expected = [item2]

    // execute
    const result = todoList.getByStatus('incomplete')

    // verify
    expect(result).toEqual(expected)
  })

  it('gets complete items', () => {
    // set up
    const item1 = todoList.create('turn the heating on!', 'joel')
    todoList.create('Do the washing up', 'joel')
    todoList.setComplete(item1.id)
    const expected = [item1]

    // execute
    const result = todoList.getByStatus('complete')

    // verify
    expect(result).toEqual(expected)
  })

  it('finds item by id', () => {
    // set up
    const item1 = todoList.create('turn the heating on!', 'pedro')
    const expected = {
      id: 1,
      text: 'turn the heating on!',
      status: 'incomplete',
      dateCreated: new Date().toLocaleDateString(),
      name: 'pedro'
    }

    // execute
    const result = todoList.findBy(item1.id)

    // verify
    expect(result).toEqual(jasmine.objectContaining(expected))
  })

  it('findBy throws error if not found', () => {
    // set up

    // execute, verify
    expect(() => todoList.findBy(1)).toThrowError('Item not found')
  })

  it('deletes item by id', () => {
    // set up
    todoList.create('turn the heating on!', 'kate')
    const expected = {
      id: 1,
      text: 'turn the heating on!',
      status: 'incomplete',
      dateCreated: new Date().toLocaleDateString(),
      name: 'kate'
    }

    // execute
    const deletedItem = todoList.deleteBy(1)

    // verify
    expect(deletedItem).toEqual(jasmine.objectContaining(expected))
    expect(todoList.showAll()).toEqual([])
  })

  it('delete throws error if not found', () => {
    // set up

    // execute, verify
    expect(() => todoList.deleteBy(1)).toThrowError('Item not found')
  })

  it('limitTextTo20Chars should return only 20 characters of the todo item text followed by ...', () => {
    // set up
    todoList.create('go for a walk and then cook dinner', 'charlie')
    const expected = {
      id: 1,
      text: 'go for a walk and th...',
      status: 'incomplete',
      dateCreated: new Date().toLocaleDateString(),
      name: 'charlie'
    }

    // execute
    const shortenedTextTodos = todoList.limitTextTo20Chars()

    // verify
    expect(shortenedTextTodos).toEqual([expected])
  })

  it('if there is only one todo item, showAll should not limit the text to 20 chars', () => {
    // set up
    todoList.create('go for a walk and then cook dinner', 'sven')
    const expected = {
      id: 1,
      text: 'go for a walk and then cook dinner',
      status: 'incomplete',
      dateCreated: new Date().toLocaleDateString(),
      name: 'sven'
    }

    // execute and verify
    expect(todoList.showAll()).toEqual([jasmine.objectContaining(expected)])
  })

  it('getTodosByDate should return a list of todos created on the day passed into the function', () => {
    // set up
    const item1 = todoList.create('turn the heating on!')
    const item2 = todoList.create('feed doggo')
    const expected = [item1, item2]

    // execute and verify
    expect(todoList.getTodosByDate('20/12/2022')).toEqual(expected)
  })

  it('getTodosByDate should return an empty array if there are no todo items created on the passed in date', () => {
    // execute and verify
    expect(todoList.getTodosByDate('19/04/1990')).toEqual([])
  })

  it('toggleStatus switches status of one todo from complete to incomplete', () => {
    // set up
    todoList.create('turn the heating on!', 'bob')
    todoList.setComplete(1)
    const expected = {
      id: 1,
      text: 'turn the heating on!',
      status: 'incomplete',
      dateCreated: new Date().toLocaleDateString(),
      name: 'bob'
    }

    // execute
    const updatedTodo = todoList.toggleStatus(1)

    // verify
    expect(updatedTodo).toEqual(jasmine.objectContaining(expected))
  })

  it('if no item found, toggleStatus throws an error', () => {
    // execute and verify
    expect(() => todoList.toggleStatus(3)).toThrowError('Item not found')
  })

  it('editItemText takes in a new string and changes the text to match it, returns updated item', () => {
    // set up
    todoList.create('go see Avatar 2', 'joel')
    const expected = {
      id: 1,
      text: 'avoid watching Avatar 2, looks lame',
      status: 'incomplete',
      dateCreated: new Date().toLocaleDateString(),
      name: 'joel'
    }

    // execute
    const updatedTodo = todoList.editItemText(
      1,
      'avoid watching Avatar 2, looks lame'
    )

    // verify
    expect(updatedTodo).toEqual(jasmine.objectContaining(expected))
  })

  it('editItemText throws an error if the id cannot be found', () => {
    expect(() => todoList.editItemText(3, 'do something')).toThrowError(
      'Item not found'
    )
  })

  it('an instance can be created successfully from the TodoItem class', () => {
    const test = new TodoItem('joel', 'go shopping', 'incomplete')

    expect(test).toBeInstanceOf(TodoItem)
  })
})

// const expected = {
//   name: 'joel',
//   text: 'go shopping',
//   status: 'incomplete',
//   dateCreated: new Date().toLocaleDateString()
// }
