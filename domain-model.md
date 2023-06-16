// Add your domain model below

1. Show only the first 20chars when displaying all items
- When seeing all the items, only show the first 20 chars of the item text, followed by '...'
- However, when displaying single items, show the whole item text.

2. To do items have dates when they were created.
- A user can search todo items by day and see a list of todo items by the day they were created.
- If there are no todos for that day, show an empty list

Method               | Message              |Inputs                               | Notes                                                           | Scenario            | Output                            | Example
-------------------- | -------------------- |-------------------------------------| --------------------------------------------------------------- | ------------------- | --------------------------------- | -------
TodoList             | create(@string)      |id @Int, text @String, status @String| id increments, status starts off incomplete, adds item to array |item is created      | todo item                         | `create('hello') => {id: 1, text: "string", status: "incomplete"}`
showAll()            |                      |                                     | returns all todo items                                          |array of todos shown | all items                         | `showAll() => [{id: 1, text: "string", status: "incomplete"}, {id: 2, text: "string", status: "incomplete"}]`
                     |                      |                                     | all item text above 20 char will have just first 20 char + '...'|array with text abrv.| all items with text abrv.         | `showAll() => [{id: 1, text: "hello world how are ...", status: "incomplete"}, {id: 2, text: "Do the washing up no...", status: "incomplete"}]`
setComplete(@Int)    |                      |id @Int                              | finds item, then updates status property                        |item exists          | updated todo item                 | `setComplete(1) => {id: 1, text: "hello", status: "complete"}`
                     |                      |                                     |                                                                 |item does not exist  | thrown error                      | `setComplete(1) => thrown error "Item not Found"`
getByStatus(@String) |                      |status @String                       | finds all items by status                                       |returns itemsByStatus| array, filtered by property status| `getByStatus("incomplete") => [{id: 2, text: "hello", status: "incomplete"}]`
                     |                      |                                     |                                                                 |                     |                                   | `getByStatus("complete") => [{id: 1, text: "hello", status: "complete"}]`
findBy(@Int)         |                      |id @Int                              | finds item by id                                                |item exists          | item                              | `findBy(1) => {id: 1, text: "hello", status: "incomplete"}`
                     |                      |                                     |                                                                 |item does not exist  | thrown error                      | `findBy(1) => thrown error "Item not Found"`
deleteBy(@Int)       |                      |id @Int                              | finds item, then removes it from array                          |item exists          | item                              | `deleteBy(@Int) => {id: 1, text: "hello", status: "incomplete"}`
                     |                      |                                     |                                                                 |item does not exist  | thrown error                      | `deleteBy(@Int) => thrown error "Item not Found"`
