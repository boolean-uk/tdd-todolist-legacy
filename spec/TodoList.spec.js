const TodoList = require("../src/TodoList.js");

describe("TodoList", () => {
  let todoList;

  beforeEach(() => {
    todoList = new TodoList();
  });

  it("creates a todo item", () => {
    // set up
    const expected = {
      id: 1,
      text: "turn the heating on!",
      status: "incomplete",
      date: /^\d{4}-\d{2}-\d{2}$/, 

    };

    // execute
    const result = todoList.create("turn the heating on!");

    // verify
    expect(result.id).toEqual(expected.id);
    expect(result.text).toEqual(expected.text);
    expect(result.status).toEqual(expected.status);
    expect(result.date).toMatch(expected.date); // Use toMatch with the regular expression
  });

  it("returns all items with truncated text when displaying all items", () => {
    // set up
    const item1 = {
      id: 1,
      text: "turn the heating on!",
      status: "incomplete",
      date: "2023-06-16",
    };
    const item2 = {
      id: 2,
      text: "Do the washing up",
      status: "incomplete",
      date: "2023-06-16", 
    };
    const expected = [item1, item2];

    // execute
    todoList.create("turn the heating on!");
    todoList.create("Do the washing up");

    // verify
    expect(todoList.showAll()).toEqual(expected);
  });

  it("sets item to be complete if found", () => {
    // set up
    const item1 = todoList.create("turn the heating on!");

    // execute
    const result = todoList.setComplete(item1.id);

    // verify
    expect(result.id).toEqual(item1.id);
    expect(result.text).toEqual(item1.text);
    expect(result.status).toEqual("complete");
    expect(result.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it("throws an error if item not found when setting complete", () => {
    // execute, verify
    expect(() => todoList.setComplete(1)).toThrowError("Item not found");
  });

  it("finds item by id", () => {
    // set up
    const item1 = todoList.create("turn the heating on!");

    // execute
    const result = todoList.findBy(item1.id);

    // verify
    expect(result.id).toEqual(item1.id);
    expect(result.text).toEqual(item1.text);
    expect(result.status).toEqual(item1.status);
    expect(result.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it("throws an error if item not found when finding by id", () => {
    // execute, verify
    expect(() => todoList.findBy(1)).toThrowError("Item not found");
  });

  it("deletes item by id", () => {
    // set up
    const item1 = todoList.create("turn the heating on!");

    // execute
    const deletedItem = todoList.deleteBy(item1.id);

    // verify
    expect(deletedItem.id).toEqual(item1.id);
    expect(deletedItem.text).toEqual(item1.text);
    expect(deletedItem.status).toEqual(item1.status);
    expect(deletedItem.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(() => todoList.findBy(item1.id)).toThrowError("Item not found");
  });

  it("throws an error if item not found when deleting by id", () => {
    // execute, verify
    expect(() => todoList.deleteBy(1)).toThrowError("Item not found");
  });

  it("edits the text of an item", () => {
    // set up
    const item1 = todoList.create("turn the heating on!");

    // execute
    const result = todoList.editText(item1.id, "updated text");

    // verify
    expect(result.id).toEqual(item1.id);
    expect(result.text).toEqual("updated text");
    expect(result.status).toEqual(item1.status);
    expect(result.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it("returns all items with truncated text when displaying all items", () => {
    // set up
    const item1 = {
      id: 1,
      text: "turn the heating on!",
      status: "incomplete",
      date: "2023-06-16",
    };
    const item2 = {
      id: 2,
      text: "Do the washing up",
      status: "incomplete",
      date: "2023-06-16",
    };
    const expected = [item1, item2];
  
    // execute
    todoList.create("turn the heating on!");
    todoList.create("Do the washing up");
  
    // verify
    expect(todoList.showAllTruncated()).toEqual(expected);
  });

  it("returns an empty list when searching for todos on a specific day with no todos", () => {
    // execute
    const result = todoList.searchByDay("2023-06-16");

    // verify
    expect(result).toEqual([]);
  });

  it("returns a list of todos created on a specific day", () => {
    // set up
    const item1 = todoList.create("turn the heating on!");
    const item2 = todoList.create("Do the washing up");
    const expected = [item1, item2];

    // execute
    const result = todoList.searchByDay("2023-06-16");

    // verify
    expect(result).toEqual(expected);
  });
});
