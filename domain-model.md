# DOMAIN MODEL

// Add your domain model below

Objects | Properties | Messages | Notes | Scenario | Output | Example
------- | ---------- | -------- | ----- | -------- | ------ | -------
TodoList | id @Int, items @Array | create(@String) | id increments, status starts off incomplete, adds item to array | | todo item | `create('hello') => {id: 1, text: "hello", status: "incomplete", date: "2023-12-15"}`
| | | showAll() | | | all items | `showAll() => [{id: 1, text: "hello", status: "incomplete", date: "2023-12-15"}]`
| | | setComplete(@Int) | finds item, then updates status property | item exists | updated todo item | `setComplete(1) => {id: 1, text: "hello", status: "complete", date: "2023-12-15"}`
| | | | | item does not exist | thrown error | `setComplete(1) => thrown error "Item not Found"`
| | | getByStatus(@String) | | | array, filtered by property status | `getByStatus("incomplete") => [{id: 1, text: "hello", status: "incomplete", date: "2023-12-15"}]`
| | | findBy(@Int) | | item exists |item | `findBy(1) => {id: 1, text: "hello", status: "incomplete", date: "2023-12-15"}`
| | | | | item does not exist | thrown error | `findBy(1) => thrown error "Item not Found"`
| | | deleteBy(@Int) | finds item, then removes it from array | item exists | item | `deleteBy(@Int) => {id: 1, text: "hello", status: "incomplete", date: "2023-12-15"}`
| | | | | item does not exist | thrown error | `deleteBy(@Int) => thrown error "Item not Found"`
|||findTodoByDate(@string)|method will map through all matching items based on the parameter and display the full item.|date does exist in array|the items | `findTodoByDate(2023-12-15) => {id: 1, text: "Do laundry", status: "incomplete", date: "2023-12-15"}`
|||||date does not exist | returns a message stating no todos exist on this day| `findTodoByDate(2024-12-15) => "No todos exist on this date."`
|||||parameter entered is not a valid date type.|returns a string message stating "please enter a valid date!"| `findTodoByDate(20XX-DEC-15) => "please enter a valid date!"`
|||displayAllItemsText()|method should return all todo items texts with a max character size of 20. If there is only 1 item. display full size of text.| There are items in the todos list array |returns an array with todo items |`displayAllItemsText() => ["Do laundry", "Go to the store and ..."]`
|||||if there are no items in the array|the method should return a string stating "No todo items"| `displayAllItemsText() => "No todo items"`
|||||if there is only one item in the todos array|method should return the item in the arrays full text length.| `displayAllItemsText() => ["Go to the store and pick up milk"]`


## REQUIREMENTS TO ADD

```
1. Show only the first 20chars when displaying all items
- When seeing all the items, only show the first 20 chars of the item text, followed by '...'
- However, when displaying single items, show the whole item text.
```

```
2. To do items have dates when they were created.
- A user can search todo items by day and see a list of todo items by the day they were created.
- If there are no todos for that day, show an empty list
```