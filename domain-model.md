// Add your domain model below

Objects | Properties | Messages | Notes | Scenario | Output | Example
------- | ---------- | -------- | ----- | -------- | ------ | -------
TodoList | id @Int, items @Array | create(@String) | id increments, status starts off incomplete, adds item to array | | todo item | `create('hello') => {id: 1, text: "hello", status: "incomplete", date: "15/12/2023"}`
| | | showAll() | | | all items, only show the first 20 chars of item text followed by '...' | `showAll() => [{id: 1, text: "hello. this is a new...", status: "incomplete", date: "15/12/2023"}]`
| | | setComplete(@Int) | finds item, then updates status property. if incomplete, sets as complete and vice versa | item exists | updated todo item | `initial state: {id: 1, text: "hello", status: "complete", date: "15/12/2023"} setComplete(1) => {id: 1, text: "hello", status: "complete", date: "15/12/2023"}`
| | | | | item does not exist | thrown error | `setComplete(1) => thrown error "Item not Found"`
| | | getByStatus(@String) | | | array, filtered by property status | `getByStatus("incomplete") => [{id: 1, text: "hello", status: "incomplete", date: "15/12/2023"}]`
| | | findBy(@Int) | | item exists |item | `findBy(1) => {id: 1, text: "hello", status: "incomplete", date: "15/12/2023"}`
| | | | | item does not exist | thrown error | `findBy(1) => thrown error "Item not Found"`
| | | deleteBy(@Int) | finds item, then removes it from array | item exists | item | `deleteBy(@Int) => {id: 1, text: "hello", status: "incomplete", date: "15/12/2023"}`
| | | | | item does not exist | thrown error | `deleteBy(@Int) => thrown error "Item not Found"`
| | | getByDate(@String) | | date is valid | array, filtered by date| `getByDate('15/12/2023) => {id: 1, text: "hello", status: "incomplete, date: "15/12/2023"}`
| | | | | date is not valid | thrown error | `getByDate('15/12/2023) => "Item not found, search by date format DD/MM/YYYY"`
| | | updateText(@int, @String) | finds item by id and updates text | item exists & text valid | todo item | `updateText(1, "Walk the dog") => {id: 1, text: "Walk the dog", status: "incomplete", date: "15/12/2023"}`
| | | | | item does not exist or text is not valid | thrown error | `updateText(1, 98) => "unable to process, make sure id is an Integer and text is a String"`
