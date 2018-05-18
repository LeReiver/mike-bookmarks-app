/*global api bookmarkList store */
'use strict';

// $.getJSON('https://thinkful-list-api.herokuapp.com/mikelr/bookmarks', (response) => { 
//   console.log('api response:', response); });

// api.createItem('33333','JS', 'http://this.com', 'this this this this', 5, (newItem) => {
//   api.getItems((items) => {
//     console.log(items);
//   });
// });

// console.log(api.createItem);
$(document).ready(function() {


  api.getItems((items) => {
    items.forEach((item) => store.addItem(item));
    //bookmarkList.render();
  });
});