  create(str) {
    if (str.length > 20) {
      const words = str.split(' ');
      const shortenedText = words.slice(0, 20).join(' ') + '...';
      console.log('this is the reduced text', shortenedText);

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
