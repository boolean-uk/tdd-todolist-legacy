# Test-Driven Development

## TodoList Legacy

### Learning Objectives

- Explain and use a process to extend simple legacy code
- Use the Red Green Refactor loop to develop code

### Quickstart

1. Fork this repository
2. Clone your fork to your local machine (example command below, see note)
3. Install project dependencies

```sh
git clone git@github.com:[username]/tdd-todoList-legacy.git && cd tdd-todoList-legacy
npm ci # to install dependencies
```

### Instructions

1. Read the specs and domain model.
2. Read the source code.
3. Read and understand new requirements
4. Extend the domain model so it represents the new requirements
5. Follow a test-driven development process to implement them: write a test, and pass it by writing source code. Repeat until you've finished.

### Requirements

You should be able to run this in your JS console (using your node REPL, or browser console). For any assumptions made, represent this in your domain model.

```md
1. Show only the first 20chars when displaying all items

- When seeing all the items, only show the first 20 chars of the item text, followed by '...'
- However, when displaying single items, show the whole item text.
```

```md
2. To do items have dates when they were created.

- A user can search todo items by day and see a list of todo items by the day they were created.
- If there are no todos for that day, show an empty list
```

### Extensions

If you have time to do more (pick whichever interests you the most):

```md
E1. Setup scripts to run tests using an npm command for:

- Running tests once
- Running tests in watch mode
```

```md
E2. To Do item can be marked incomplete as well as complete.

- A user can simply toggle the `status` property between `complete` and `incomplete`.
- A ToDo item should still default to being `incomplete` when created.
- returns the item that has been updated.
```

```md
E3. To Do item `text` can be edited.

- A user can update the text for a given item.
- returns the item that has been updated.
```

```md
E4. Create a new class for a ToDoItem.

- It should have the `name`, `text`, and `status` fields.
- A user should be able to create it, delete it, and set it as complete.
- If implemented previously, a user should be able to edit the text, and toggle the complete status.
- Create a domain model for this new class.
- Update the ToDoList class as necessary.
```
