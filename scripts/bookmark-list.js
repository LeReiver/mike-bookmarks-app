'use strict';

const bookmarkList = (function() {

  function generateExpandedView(item, itemIndex){
    // html element goes here
    // return `<li>....</li>`
    // render();
  }

  function generateCreateBookmarkView() {

    // html element goes here
    // return `<li>....</li>`
    // render();
  }


  function filterByRating() {
    
  }


  function handleCreateBookmarkClicked() {
    $('#js-create-bookmark-form').submit(function(event) {
      console.log('`handleCreateBookmarkClicked` ran');
      event.preventDefault();
      generateCreateBookmarkView();
    });
  }


  function handleExpandViewClicked() {
    $('.js-bookmark-list').on('click', '.js-bookmark-list-items', event => {
      console.log('`handleExpandViewClicked` ran');
      generateExpandedView();
    });
  }


  function handleDeleteBookmarkClicked() {
    $('.js-delete-bookmark').on('click', 'js-bookmark-list-item', event => {
      console.log('`handleDeleteBookmarkClicked` ran');
    });
  }


  function handleFilterByRatingClicked() {
    $('#js-filter-bookmark-form').on('change', function(event) {
      console.log('`handleFilterByRatingClicked` ran');
      event.preventDefault();
      filterByRating();
    });
  }


  function render() {

  }


  function main() {
    handleExpandViewClicked();
    handleDeleteBookmarkClicked();
    handleCreateBookmarkClicked();
    handleFilterByRatingClicked();
  }

  main();


}());