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
      date: '15/12/2023'
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
      date: '15/12/2023'
    }
    const item2 = {
      id: 2,
      text: "Do the washing up",
      status: "incomplete",
      date: '15/12/2023'
    }
    const item3 = {
      id: 3,
      text: "Do the laundry at ex...",
      status: "incomplete",
      date: '15/12/2023'
    }
    const expected = [item1, item2, item3]

    // execute
    todoList.create("turn the heating on!")
    todoList.create("Do the washing up")
    todoList.create("Do the laundry at exactly 9am")
    const result = todoList.showAll()

    // verify
    expect(result).toEqual(expected)
  })

  describe('Set complete status', () => {
    it("sets item to be complete if found", () => {
      // set up
      const expected = {
        id: 1,
        text: "turn the heating on!",
        status: "complete",
        date: '15/12/2023'
      }
  
      // execute
      todoList.create("turn the heating on!")
      const result = todoList.setComplete(1)
  
      // verify
      expect(result).toEqual(expected)
    })
  
    it("throws error if item is not found", () => {
      // set up
  
      // execute, verify
      expect(() => todoList.setComplete(1)).toThrowError("Item not found")
    })
  })

  describe('Get item by completion status', () => {
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
  })

  describe('Find item by id', () => {
    it("finds item by id", () => {
      // set up
      const expected = {
        id: 1,
        text: "turn the heating on!",
        status: "incomplete",
        date: '15/12/2023'
      }
  
      // execute
      todoList.create("turn the heating on!")
      const result = todoList.findBy(1)
  
      // verify
      expect(result).toEqual(expected)
    })
  
    it("findBy throws error if not found", () => {
      // set up
  
      // execute, verify
      expect(() => todoList.findBy(1)).toThrowError("Item not found")
    })
  })

  describe('Delete item by id', () => {
    it("deletes item by id", () => {
      // set up
      const expected = {
        id: 1,
        text: "turn the heating on!",
        status: "incomplete",
        date: '15/12/2023'
      }
  
      // execute
      todoList.create("turn the heating on!")
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

  describe('Show todos by date', () => {
    it('getByDate returns all items by date', () => {
      // set up
      const expected = [{
        id: 1,
        text: "turn the heating on!",
        status: "incomplete",
        date: '15/12/2023'
      },
      {
        id: 2,
        text: "Do the washing up",
        status: "incomplete",
        date: '15/12/2023'
      }]

      // execute
      const result = todoList.getByData('15/12/2023')

      // verify
      expect(result).toEqual(expected)
    })

    it('getByDate throws error if date not found', () => {
      // set up

      // execute/verify
      expect(() => todoList.getByStatus().toThrowError("Item not found, search by date format DD/MM/YYYY"))
    })
  })
  
})
