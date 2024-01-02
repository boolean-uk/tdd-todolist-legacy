const TodoList = require("../src/TodoList.js")

describe("TodoList", () => {
  let todoList

  beforeEach(() => {
    todoList = new TodoList()
  })

  it("creates a todo item", () => {
    // set up


    const todo1 = todoList.create("turn the heating on!")
    const todo2 = todoList.create("Go to the town for shopping and a dinner ")
    const todo3 = todoList.create('work on my project and do some exercises on javascript')

    // execute
    const expected =[
      { id: 1, text: 'turn the heating on!', status: 'incomplete' },
      { id: 2, text: 'Go to the town for s...', status: 'incomplete' }
    ]

    // verify
    expect(todo1).toEqual({ id: 1, text: 'turn the heating on!', status: 'incomplete' })
    expect(todo2).toEqual({ id: 2, text: 'Go to the town for s...', status: 'incomplete' })
  })

  it("returns all items", () => {
    // set up
    const item1 = {
      id: 1,
      text: "turn the heating on!",
      status: "incomplete"
    }
    const item2 = {
      id: 2,
      text: "Do the washing up",
      status: "incomplete"
    }
    const item3 = {
      id: 2,
      text: "work on my project and do some exercises on javascript",
      status: "incomplete"
    }

    const item3Tobe = {
      id: 3,
      text: "work on my project a...",
      status: "incomplete"
    }
    const expected = [item1, item2, item3Tobe]

    // execute
    todoList.create("turn the heating on!")
    todoList.create("Do the washing up")
    todoList.create("work on my project and do some exercises on javascript")

 
    // verify
    expect(todoList.showAll()).toEqual(expected)
  })

  it("sets item to be complete if found", () => {
    // set up
    const item1 = todoList.create("turn the heating on!")
    const expected = {
      id: 1,
      text: "turn the heating on!",
      status: "complete"
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
    const item1 = todoList.create("turn the heating on!")
    const item2 = todoList.create("Do the washing up")
    todoList.setComplete(item1.id)
    const expected = [item2]

    // execute
    const result = todoList.getByStatus("incomplete")

    // verify
    expect(result).toEqual(expected)
  })

  it("gets complete items", () => {
    // set up
    const item1 = todoList.create("turn the heating on!")
    const item2 = todoList.create("Do the washing up")
    todoList.setComplete(item1.id)
    const expected = [item1]

    // execute
    const result = todoList.getByStatus("complete")

    // verify
    expect(result).toEqual(expected)
  })

  it("finds item by id", () => {
    // set up
    const item1 = todoList.create("turn the heating on!")
    const expected = {
      id: 1,
      text: "turn the heating on!",
      status: "incomplete"
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
    const item1 = todoList.create("turn the heating on!")
    const expected = {
      id: 1,
      text: "turn the heating on!",
      status: "incomplete"
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
})
