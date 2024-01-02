class TodoList {
    constructor() {
      this.items = [];
      this.id = 0;
    }
  
    create(str) {
      
      if (str.length > 20) {
        const shortenedText = `${str.substring(0, 20)}...`;
  
        this.id++;
        const item = { id: this.id, text: shortenedText, status: 'incomplete' };
        this.items.push(item);
        return item;
      } else {
        this.id++;
        const item = { id: this.id, text: str, status: 'incomplete' };
        this.items.push(item);
        return item;
      }
    }
  }
  
  const expected = [
    {
      id: 1,
      text: "turn the heating on and go to the city center for shopping",
      status: "incomplete"
    },
    {
      id: 2,
      text: "this is my bag",
      status: "incomplete"
    }
    ,
    {
      id: 3,
      text: 'Going Home',
      status: "incomplete"
    },
  
  
  
  ]
  const newTodo = new TodoList();
  const result1 = newTodo.create('This is the first day of the year in the year 2024');
  const result2 = newTodo.create('This is my best year');
  const result3 = newTodo.create('New year');

  console.log(result3 );
  console.log(result1 );

