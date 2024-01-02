const TodoList = require("../src/TodoList.js")

describe("TodoList", () => {
  let todoList

  beforeEach(() => {
    todoList = new TodoList()
  })

  it("creates a todo item", () => {
    // set up


    const todo1 = todoList.create("turn the heating on!", '11-28-2023')
    const todo2 = todoList.create("Go to the town for shopping and a dinner", '09-15-2023')
    const todo3 = todoList.create('work on my project and do some exercises on javascript')

    // execute
    const expected =[
      { id: 1, text: 'turn the heating on!', status: 'incomplete' , date: '11-28-2023'},
      { id: 2, text: 'Go to the town for s...', status: 'incomplete', date: '09-15-2023'}
    ]

    // verify
    expect(todo1).toEqual( { id: 1, text: 'turn the heating on!', status: 'incomplete' , date: '11-28-2023'})
    expect(todo2).toEqual({ id: 2, text: 'Go to the town for s...', status: 'incomplete', date: '09-15-2023'})
  })

  it("returns all items", () => {
    // set up
    const item1 = {
      id: 1,
      text: "turn the heating on!",
      status: "incomplete",
      date: '10-10-2021'
    }
    const item2 = {
      id: 2,
      text: "Do the washing up",
      status: "incomplete",
      date: '01-12-2023'


    }
    const item3 = {
      id: 2,
      text: "work on my project and do some exercises on javascript",
      status: "incomplete",
      date: "23-09-2023",
      
    }

    const item3Tobe = {
      id: 3,
      text: "work on my project a...",
      status: "incomplete",
      date: "23-09-2023"

    }
    const expected = [item1, item2, item3Tobe]

    // execute
    todoList.create("turn the heating on!", "10-10-2021")
    todoList.create("Do the washing up", "01-12-2023")
    todoList.create("work on my project and do some exercises on javascript", "23-09-2023")

 
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
      date : "05-08-2023"
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
      status: "incomplete",
      date : "05-08-2023"

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
      date : "05-08-2023"

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

  it('search todo items by date', ()=>{
      //set up
      const item1 = {
        id: 1,
        text: "turn the heating on!",
        status: "incomplete",
        date: '10-10-2021'
      }

      const item2 = {
        id: 2,
        text: "Do the washing up",
        status: "incomplete",
        date: "01-12-2023"
      }


      const item3 = {
        id: 3,
        text:"Go to the gym",
        status: "incomplete",
        date: "01-12-2024"
      }

      const item4 = {
        id: 4,
        text:"Go to the GP",
        status: "incomplete",
        date: "01-03-2024"
      }


      todoList.create("turn the heating on!", "10-10-2021")
      todoList.create("Do the washing up", "01-12-2023")
      todoList.create("Go to the gym", "01-12-2024")
      todoList.create("Go to the GP", "01-03-2024")


      //execute
      const firstSearch = todoList.searchByDate("01-12-2024")

      //verify
      expect(firstSearch).toEqual(item3)



  })
})
