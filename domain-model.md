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

## part 1

Show only the first 20chars when displaying all items

- When viewing all items, display only the first 20 characters of each item's text, followed by '...'
- However, when displaying individual items, show the entire item text.

# Method

ShowAll()

# Input

item(@obj) => text: @string, id: @number, status: @string, date: @string

# Scenario

If text.length > 20, display the first 20 characters; otherwise, show the full length of the text.

# Output

show text char from 0 to 20

## part 2

2. To-do items have dates when they were created..

- Users can search to-do items by day and view a list of items created on that specific day.
- If there are no to-dos for that day, display an empty list.

# Method

findTheDate()

# Input

item(@ting) => year-month-day

# Scenario

when date is passed into the findTheDate function

# Output

Return items created on the same day as the one passed into the function; otherwise, return an empty string.
