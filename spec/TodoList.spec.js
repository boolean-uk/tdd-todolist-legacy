const TodoList = require("../src/TodoList.js")

describe("TodoList", () => {
  let todoList

  beforeEach(() => {
    todoList = new TodoList()
  })

  it("creates a todo item", () => {
    // set up
    const expected = {
      id: 1,
      text: "turn the heating on!",
      status: "incomplete",
      date: ''
    }

    // execute
    const result = todoList.create("turn the heating on!", '')

    // verify
    expect(result).toEqual(expected)
  })

  it("returns all items", () => {
    // set up
    const item1 = {
      id: 1,
      text: "0123456789 012345678...",
      status: "incomplete",
      date: ''
    }
    const item2 = {
      id: 2,
      text: "0123456789 012345678...",
      status: "incomplete",
      date: ''
    }
    const expected = [item1, item2]

    // execute
    todoList.create("0123456789 0123456789 0123456789", '')
    todoList.create("0123456789 0123456789 0123456789", '')

    // verify
    expect(todoList.showAll()).toEqual(expected)
  })

  it("sets item to be complete if found", () => {
    // set up
    const item1 = todoList.create("turn the heating on!", '')
    const expected = {
      id: 1,
      text: "turn the heating on!",
      status: "complete",
      date: ''
    }

    // execute
    const result = todoList.setComplete(item1.id)

    // verify
    expect(result).toEqual(expected)
  })

  it("throws error if not found", () => {
    // set up

    // execute, verify
    expect(() => todoList.setComplete(1)).toThrowError("Item not found")
  })

  it("gets incomplete items", () => {
    // set up
    const item1 = todoList.create("turn the heating on!", '')
    const item2 = todoList.create("Do the washing up", '')
    todoList.setComplete(item1.id)
    const expected = [item2]

    // execute
    const result = todoList.getByStatus("incomplete")

    // verify
    expect(result).toEqual(expected)
  })

  it("gets complete items", () => {
    // set up
    const item1 = todoList.create("turn the heating on!", '')
    const item2 = todoList.create("Do the washing up", '')
    todoList.setComplete(item1.id)
    const expected = [item1]

    // execute
    const result = todoList.getByStatus("complete")

    // verify
    expect(result).toEqual(expected)
  })

  it("finds item by id", () => {
    // set up
    const item1 = todoList.create("turn the heating on!", '')
    const expected = {
      id: 1,
      text: "turn the heating on!",
      status: "incomplete",
      date: ''
    }

    // execute
    const result = todoList.findBy(item1.id)

    // verify
    expect(result).toEqual(expected)
  })

  it("findBy throws error if not found", () => {
    // set up

    // execute, verify
    expect(() => todoList.findBy(1)).toThrowError("Item not found")
  })

  it("deletes item by id", () => {
    // set up
    const item1 = todoList.create("turn the heating on!", '')
    const expected = {
      id: 1,
      text: "turn the heating on!",
      status: "incomplete",
      date: ''
    }

    // execute
    const deletedItem = todoList.deleteBy(1)

    // verify
    expect(deletedItem).toEqual(expected)
    expect(todoList.showAll()).toEqual([])
  })

  it("delete throws error if not found", () => {
    // set up

    // execute, verify
    expect(() => todoList.deleteBy(1)).toThrowError("Item not found")
  })
  it('seach for items by day', () => {
    todoList.create('test1', 'monday')
    todoList.create('test2', 'monday')
    todoList.create('test3', 'tuesday')
    const expected = [
      {
        id: 1,
        text: 'test1',
        status: 'incomplete',
        date: 'monday'
      },
      {
        id: 2,
        text: 'test2',
        status: 'incomplete',
        date: 'monday'
      }
    ]
    const result = todoList.findByDay('monday')

    expect(result).toEqual(expected)
  })
})
