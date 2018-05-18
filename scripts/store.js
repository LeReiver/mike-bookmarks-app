'use strict'

const store = (function() {

  const addItem = function(item) {
    this.items.push(item);
  };

  const findById = function(id) {
    return this.items.find(item => item.id === id);
  };

  const findAndDelete = function(id) {
    this.items = this.items.filter(item => item.id !== id);
  };

  // test data
  const data = [
    {
      'id': '8sdfbvbs65sd',
      'title': 'Google',
      'url': 'http://google.com',
      'desc': 'An indie search engine startup',
      'rating': 4
    },
    {
      'id': '87fn36vd9djd',
      'title': 'Fluffiest Cats in the World',
      'url': 'http://medium.com/bloggerx/fluffiest-cats-334',
      'desc': 'The only list of fluffy cats online',
      'rating': 5
    }
  ];
  

  return {
    items: [],
    adding: false,
    error: null,

    addItem,
    findById,
    findAndDelete
  };
  
}());