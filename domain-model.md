// Add your domain model below

| Objects  | Properties            | Messages             | Notes                                                           | Scenario            | Output                             | Example                                                                       |
| -------- | --------------------- | -------------------- | --------------------------------------------------------------- | ------------------- | ---------------------------------- | ----------------------------------------------------------------------------- |
| TodoList | id @Int, items @Array | create(@String)      | id increments, status starts off incomplete, adds item to array |                     | todo item                          | `create('hello') => {id: 1, text: "hello", status: "incomplete"}`             |
|          |                       | showAll()            |                                                                 |                     | all items                          | `showAll() => [{id: 1, text: "hello", status: "incomplete"}]`                 |
|          |                       | setComplete(@Int)    | finds item, then updates status property                        | item exists         | updated todo item                  | `setComplete(1) => {id: 1, text: "hello", status: "complete"}`                |
|          |                       |                      |                                                                 | item does not exist | thrown error                       | `setComplete(1) => thrown error "Item not Found"`                             |
|          |                       | getByStatus(@String) |                                                                 |                     | array, filtered by property status | `getByStatus("incomplete") => [{id: 1, text: "hello", status: "incomplete"}]` |
|          |                       | findBy(@Int)         |                                                                 | item exists         | item                               | `findBy(1) => {id: 1, text: "hello", status: "incomplete"}`                   |
|          |                       |                      |                                                                 | item does not exist | thrown error                       | `findBy(1) => thrown error "Item not Found"`                                  |
|          |                       | deleteBy(@Int)       | finds item, then removes it from array                          | item exists         | item                               | `deleteBy(@Int) => {id: 1, text: "hello", status: "incomplete"}`              |
|          |                       |                      |                                                                 | item does not exist | thrown error                       | `deleteBy(@Int) => thrown error "Item not Found"`                             |

## Requirements

| Method | Input | Data | Scenario | Output |
| ------ | ----- | ---- | -------- | ------ |

|showAll() | item(@obj) | text: @string, id: @number, status: @string | if text.length > 20 | show text char from 0 to 20

## part 1

Show only the first 20chars when displaying all items

- When seeing all the items, only show the first 20 chars of the item text, followed by '...'
- However, when displaying single items, show the whole item text.

# Method

minimizeText()

# Input

item(@obj) => text: @string, id: @number, status: @string

# Scenario

if text.length > 20

# Output

show text char from 0 to 20

## part 2

2. To do items have dates when they were created.
- A user can search todo items by day and see a list of todo items by the day they were created.
- If there are no todos for that day, show an empty list
