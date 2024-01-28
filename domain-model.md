// Add your domain model below

Objects | Properties | Messages | Notes | Scenario | Output | Example
------- | ---------- | -------- | ----- | -------- | ------ | -------
TodoList | id @Int, items @Array | create(@String) | id increments, status starts off incomplete, adds item to array | | todo item | `create('hello') => {id: 1, text: "hello", status: "incomplete"}`
| | | showAll() | | in the text less than 20 chars | all items | `showAll() => [{id: 1, text: "hello", status: "incomplete"}]`
| | | showAll() | | in the text more than 20 chars | all items | `showAll() => [{id: 1, text: "in the text more the...", status: "incomplete"}]`
| | | setComplete(@Int) | finds item, then updates status property | item exists | updated todo item | `setComplete(1) => {id: 1, text: "hello", status: "complete"}`
| | | | | item does not exist | thrown error | `setComplete(1) => thrown error "Item not Found"`
| | | getByStatus(@String) | | | array, filtered by property status | `getByStatus("incomplete") => [{id: 1, text: "hello", status: "incomplete"}]`
| | | findBy(@Int) | The item "text" should show full sentence without "..." | item exists |item | `findBy(1) => {id: 1, text: "hello", status: "incomplete"}`
| | | | | item does not exist | thrown error | `findBy(1) => thrown error "Item not Found"`
| | | deleteBy(@Int) | finds item, then removes it from array | item exists | item | `deleteBy(@Int) => {id: 1, text: "hello", status: "incomplete"}`
| | | | | item does not exist | thrown error | `deleteBy(@Int) => thrown error "Item not Found"`
| | | findByDate(@String) | a user can search todo items by dat and see a list of todo items by the day they were created | item exist | list of items | `findByDate("20-12-2023") => [{id: 1, text: "hello", status: "incomplete", date: "20-12-2023"}]"`
| | | | | item does not exist | list | `deleteBy(@String) => []`
