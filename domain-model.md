// Add your domain model below

Objects | Properties | Messages | Notes | Scenario | Output | Example
------- | ---------- | -------- | ----- | -------- | ------ | -------
TodoList | id @Int, items @Array | create(@String) | id increments, status starts off incomplete, adds item to array | | todo item | `create('hello') => {id: 1, text: "hello", status: "incomplete"}`
| | | getAll() | | | all items | `showAll() => [{id: 1, text: "hello", status: "incomplete"}]`
| | | setComplete(@Int) | finds item, then updates status property | item exists | updated todo item | `setComplete(1) => {id: 1, text: "hello", status: "complete"}`
| | | | | item does not exist | thrown error | `setComplete(1) => thrown error "Item not Found"`
| | | getByStatus(@String) | | | array, filtered by property status | `getByStatus("incomplete") => [{id: 1, text: "hello", status: "incomplete"}]`
| | | findBy(@Int) | | item exists |item | `findBy(1) => {id: 1, text: "hello", status: "incomplete"}`
| | | | | item does not exist | thrown error | `findBy(1) => thrown error "Item not Found"`
| | | deleteBy(@Int) | finds item, then removes it from array | item exists | item | `deleteBy(@Int) => {id: 1, text: "hello", status: "incomplete"}`
| | | | | item does not exist | thrown error | `deleteBy(@Int) => thrown error "Item not Found"`
| | | displaySummary(@String[]) | show only the first 20chars and adds ... at the end of that string | there is only one item in the list  / there are two items or more in the list | 20 char.-long string / item.text (as a string)
| | | setCurrentDate(@String)| return a string showing the current date in the yy.mm.dd format |
| | | findByDate(@String) | can search todo items by day | date exist / date does not exist or is invalid | a list of the todos matching that date / an empty list (+ throw an error)
| | | showAllSummaries(@String) | summaries don't exist | shows a list (array) of all the summaries / an empty list
