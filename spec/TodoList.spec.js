const TodoList = require('../src/TodoList.js')

describe('TodoList', () => {
  let todoList

  beforeEach(() => {
    todoList = new TodoList()
  })
  describe('TodoList.create', () => {
    it('creates a todo item', () => {
      // set up
      const todaysDate = new Date()
      const dateString = `${todaysDate.getFullYear()}-${
        todaysDate.getMonth() + 1
      }-${todaysDate.getDate()}`
      const expected = {
        id: 1,
        text: 'turn the heating on!',
        status: 'incomplete',
        date: dateString
      }

      // execute
      const result = todoList.create('turn the heating on!')

      // verify
      expect(result).toEqual(expected)
    })
  })
  describe('showAll()', () => {
    it('returns all items', () => {
      // set up
      const todaysDate = new Date()
      const dateString = `${todaysDate.getFullYear()}-${
        todaysDate.getMonth() + 1
      }-${todaysDate.getDate()}`
      const item1 = {
        id: 1,
        text: 'turn the heating on!',
        status: 'incomplete',
        date: dateString
      }
      const item2 = {
        id: 2,
        text: 'Do the washing up',
        status: 'incomplete',
        date: dateString
      }

      // execute
      const expected = [item1, item2]
      todoList.create('turn the heating on!')
      todoList.create('Do the washing up')

      // verify
      expect(todoList.showAll()).toEqual(expected)
    })
    it('if item text is more than 20 char , it should show only the first 20 char and ...', () => {
      // set up
      const todaysDate = new Date()
      const dateString = `${todaysDate.getFullYear()}-${
        todaysDate.getMonth() + 1
      }-${todaysDate.getDate()}`
      const expected = [
        {
          id: 1,
          text: 'Hello world how are ...',
          status: 'incomplete',
          date: dateString
        },
        {
          id: 2,
          text: 'Do the washing up no...',
          status: 'incomplete',
          date: dateString
        }
      ]

      // execute

      todoList.create('Hello world how are you today')
      todoList.create('Do the washing up now!')

      expect(todoList.showAll()).toEqual(expected)
    })
  })
  describe('setComplete()', () => {
    it('sets item to be complete if found', () => {
      // set up
      const todaysDate = new Date()
      const dateString = `${todaysDate.getFullYear()}-${
        todaysDate.getMonth() + 1
      }-${todaysDate.getDate()}`
      const item1 = todoList.create('turn the heating on!')
      const expected = {
        id: 1,
        text: 'turn the heating on!',
        status: 'complete',
        date: dateString
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

  describe('getByStatus', () => {
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

  describe('findBy()', () => {
    it('finds item by id', () => {
      // set up
      const todaysDate = new Date()
      const dateString = `${todaysDate.getFullYear()}-${
        todaysDate.getMonth() + 1
      }-${todaysDate.getDate()}`
      const item1 = todoList.create('turn the heating on!')
      const expected = {
        id: 1,
        text: 'turn the heating on!',
        status: 'incomplete',
        date: dateString
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

  describe('deleteBy()', () => {
    it('deletes item by id', () => {
      // set up
      const todaysDate = new Date()
      const dateString = `${todaysDate.getFullYear()}-${
        todaysDate.getMonth() + 1
      }-${todaysDate.getDate()}`
      const item1 = todoList.create('turn the heating on!')
      const expected = {
        id: 1,
        text: 'turn the heating on!',
        status: 'incomplete',
        date: dateString
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
  describe('itemByDay', () => {
    it('all items with same day will be shown', () => {
      const todaysDate = new Date()
      const item1 = todoList.create('turn the heating on!')
      const item2 = todoList.create('figure out what we will be doing today')
      const expected = [item1, item2]
      expect(
        todoList.itemByDay(
          todaysDate.getFullYear(),
          todaysDate.getMonth() + 1,
          todaysDate.getDate()
        )
      ).toEqual(expected)
    })
    it('no items found on chosen day', () => {
      const todaysDate = new Date()
      expect(
        todoList.itemByDay(
          todaysDate.getFullYear(),
          todaysDate.getMonth() + 1,
          todaysDate.getDate()
        )
      ).toEqual([])
    })
  })
})
