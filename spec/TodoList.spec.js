const TodoList = require("../src/TodoList.js")

describe("TodoList", () => {
  let todoList
  let date

  beforeEach(() => {
    todoList = new TodoList()
    date = new Date()
  })

  it("creates a todo item", () => {
    // set up
    const expected = {
      id: 1,
      text: "turn the heating on!",
      status: "incomplete",
      date: date.getFullYear().toString() + '-' +(date.getMonth()+1).toString() + '-'+ date.getDate().toString()
    }

    // execute
    const result = todoList.create("turn the heating on!")

    // verify
    expect(result).toEqual(expected)
  })


  it("returns all items", () => {
    // set up
    const item1 = {
      id: 1,
      text: "turn the heating on!",
      status: "incomplete",
      date: date.getFullYear().toString() + '-' +(date.getMonth()+1).toString() + '-'+ date.getDate().toString()
    }
    const item2 = {
      id: 2,
      text: "Do the washing up",
      status: "incomplete",
      date: date.getFullYear().toString() + '-' +(date.getMonth()+1).toString() + '-'+ date.getDate().toString()
    }
    const item3 = {
      id: 3,
      text: "This is a todo that ...",
      status: 'incomplete',
      date: date.getFullYear().toString() + '-' +(date.getMonth()+1).toString() + '-'+ date.getDate().toString()
    }
    const expected = [item1, item2, item3]

    // execute
    todoList.create("turn the heating on!")
    todoList.create("Do the washing up")
    todoList.create('This is a todo that is longer than 20 characters')

    // verify
    expect(todoList.showAll()).toEqual(expected)
  })
  

  it("sets item to be complete if found", () => {
    // set up
    const item1 = todoList.create("turn the heating on!")
    const expected = {
      id: 1,
      text: "turn the heating on!",
      status: "complete",
      date: date.getFullYear().toString() + '-' +(date.getMonth()+1).toString() + '-'+ date.getDate().toString()
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
    todoList.create("Do the washing up")
    todoList.create('This is a string that is longer than 20 characters')
    todoList.setComplete(item1.id)
    const expected = [{id: 2, text: "Do the washing up", status: "incomplete", date: date.getFullYear().toString() + '-' +(date.getMonth()+1).toString() + '-'+ date.getDate().toString()}, {id: 3, text: 'This is a string tha...', status: "incomplete", date: date.getFullYear().toString() + '-' +(date.getMonth()+1).toString() + '-'+ date.getDate().toString()}]

    // execute
    const result = todoList.getByStatus("incomplete")

    // verify
    expect(result).toEqual(expected)
  })

  it("gets complete items", () => {
    // set up
    const item1 = todoList.create("turn the heating on!")
    todoList.create("Do the washing up")
    const item3 = todoList.create('This is a string that is longer than 20 characters')
    todoList.setComplete(item1.id)
    todoList.setComplete(item3.id)
    const expected = [{id: 1, text: "turn the heating on!", status: "complete", date: date.getFullYear().toString() + '-' +(date.getMonth()+1).toString() + '-'+ date.getDate().toString()}, {id: 3, text: "This is a string tha...", status: "complete", date: date.getFullYear().toString() + '-' +(date.getMonth()+1).toString() + '-'+ date.getDate().toString()}]

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
      status: "incomplete",
      date: date.getFullYear().toString() + '-' +(date.getMonth()+1).toString() + '-'+ date.getDate().toString()
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
      status: "incomplete",
      date: date.getFullYear().toString() + '-' +(date.getMonth()+1).toString() + '-'+ date.getDate().toString()
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

  // Happy Path
  it('Finds the items and returns them in an array, showing the items corresponding to the same date', () => {
    // Set up
    todoList.create("turn the heating on!")
    todoList.create("Do the washing up")
    todoList.create('This is a string that is longer than 20 characters')

    // Execute
    const result = todoList.showByDate(date.getFullYear().toString() + '-' +(date.getMonth()+1).toString() + '-'+ date.getDate().toString())

    // Verify
    expect(result).toEqual([{
      id: 1,
      text: "turn the heating on!",
      status: "incomplete",
      date: date.getFullYear().toString() + '-' +(date.getMonth()+1).toString() + '-'+ date.getDate().toString()
    }, 
    {
      id: 2,
      text: "Do the washing up",
      status: "incomplete",
      date: date.getFullYear().toString() + '-' +(date.getMonth()+1).toString() + '-'+ date.getDate().toString()
    }, 
    {
      id: 3,
      text: "This is a string tha...",
      status: "incomplete",
      date: date.getFullYear().toString() + '-' +(date.getMonth()+1).toString() + '-'+ date.getDate().toString()
    }])
  })

  // Sad Path
  it('Will return an empty array if there are no todos with the corresponding date', () => {
    // Set up
    todoList.create("turn the heating on!")
    todoList.create("Do the washing up")
    todoList.create('This is a string that is longer than 20 characters')

    // Execute
    const result = todoList.showByDate("2023-3-16")

    // Verify
    expect(result).toEqual([])

  })
})
