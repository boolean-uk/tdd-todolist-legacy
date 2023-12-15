const { TodoList, TodoItem, setId } = require("../src/TodoList.js")

describe("TodoList", () => {
  let todoList

  beforeEach(() => {
    todoList = new TodoList()
    setId(1)
  })

  it("create() creates a todo item", () => {
    // set up
    const expected = {
      id: 1,
      text: "turn the heating on!",
      status: "incomplete",
      date: '15/12/2023'
    }

    // execute
    const result = todoList.create(new TodoItem("turn the heating on!"))

    // verify
    expect(result).toEqual(expected)
  })

  it("showAll() returns all items", () => {
    // set up
    const expected = [
      {
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
      },
      {
        id: 3,
        text: "Do the laundry at ex...",
        status: "incomplete",
        date: '15/12/2023'
      }
    ]

    // execute
    todoList.create(new TodoItem("turn the heating on!"))
    todoList.create(new TodoItem("Do the washing up"))
    todoList.create(new TodoItem("Do the laundry at exactly 9am"))
    const result = todoList.showAll()

    // verify
    expect(result).toEqual(expected)
  })

  describe('Set complete status', () => {
    it("sets item to be 'complete' if found & status is currently 'incomplete'", () => {
      // set up
      const expected = {
        id: 1,
        text: "turn the heating on!",
        status: "complete",
        date: '15/12/2023'
      }
  
      // execute
      todoList.create(new TodoItem("turn the heating on!"))
      const result = todoList.setComplete(1)
  
      // verify
      expect(result).toEqual(expected)
    })

    it("sets item to be 'incomplete' if found & status is currently 'complete'", () => {
      // set up
      const expected = {
        id: 1,
        text: "turn the heating on!",
        status: "incomplete",
        date: '15/12/2023'
      }
  
      // execute
      todoList.create(new TodoItem("turn the heating on!"))
      todoList.setComplete(1)
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
      const item1 = todoList.create(new TodoItem("turn the heating on!"))
      const item2 = todoList.create(new TodoItem("Do the washing up"))
      todoList.setComplete(item1.id)
      const expected = [item2]
  
      // execute
      const result = todoList.getByStatus("incomplete")
  
      // verify
      expect(result).toEqual(expected)
    })
  
    it("gets complete items", () => {
      // set up
      const item1 = todoList.create(new TodoItem("turn the heating on!"))
      const item2 = todoList.create(new TodoItem("Do the washing up"))
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
      todoList.create(new TodoItem("turn the heating on!"))
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
      todoList.create(new TodoItem("turn the heating on!"))
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
      todoList.create(new TodoItem("turn the heating on!"))
      todoList.create(new TodoItem("Do the washing up"))
      const result = todoList.getByDate('15/12/2023')

      // verify
      expect(result).toEqual(expected)
    })

    it('getByDate throws error if date not found', () => {
      // set up

      // execute/verify
      expect(() => todoList.getByDate().toThrowError("Item not found, search by date format DD/MM/YYYY"))
    })
  })

  describe('Update item text', () => {
    it('updateText finds the selected todo by id and updates the text to user input', () => {
      // set
      const expected = {
        id: 1,
        text: "Walk the dog",
        status: "incomplete",
        date: '15/12/2023'
      }
      
      // execute
      todoList.create(new TodoItem("turn the heating on!"))
      const result = todoList.updateText(1, "Walk the dog")

      // verify
      expect(result).toEqual(expected)
    })

    it('updateText throws error if item is not found or text is invalid', () => {
      // set

      // execute/verify
      expect(() => todoList.updateText()).toThrowError("unable to process, make sure id is an Integer and text is a String")
    })
  })
})
