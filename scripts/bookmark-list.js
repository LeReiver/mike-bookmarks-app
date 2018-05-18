/* global store api */
'use strict';

const bookmarkList = (function() {

  function generateBookmarkElement(item) {
    console.log('Generating Bookmark element ran');
    return `
      <li class="bookmark-list-items js-bookmark-list-items" data-item-id="${item.id}">
      <h3 class="list-title js-list-title">${item.name}</h3>
      <a class="list-link js-list-link" href="${item.url}" target="_blank">${item.url}</a>
      <section class="star-rating js-star-rating">
        <p class="star-number js-star-number">${item.rating}</p>
      </section>
    </li>`;
  }

  function generateBookmarkString(bookmarkList) {
    const items = bookmarkList.map((item) => generateBookmarkElement(item));
    return items.join('');
  }

  function generateExpandedView(item){
    console.log('Generating Expanded view ran');
    return `
      <li class="expand-bookmark-view js-expand-bookmark-view">
        <h2>Article Title</h2>
        <p class="expanded-stars js-expanded-stars">5 STARS</p>
        <p class="long-desc js-long-desc">
            Another very common task in modern websites and applications is 
            retrieving individual data items from the server to update sections 
            of a webpage without having to load an entire new page. This seemingly 
            small detail has had a huge impact on the performance and behavior of 
            sites, so in this article we'll explain the concept and look at 
            technologies that make it possible, such as XMLHttpRequest and the Fetch API.
        </p>
        <a class="bookmark-link js-bookmark-link" href="https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Fetching_data" target="_blank">
          https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Fetching_data
        </a>
        <div>
            <a class="bookmark-link js-bookmark-link" href="https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Fetching_data" target="_blank">
            <button class="visit-site-button js-visit-site-button" type="submit">VISIT</button></a>
        </div>
        <div id="js-delete-bookmark">
          <button class="delete-bookmark-button js-delete-bookmark-button" type="submit">DELETE</button>
        </div>
      </li>`;
  }

  function generateCreateBookmarkView() {
    console.log('Generating Create Bookmark element ran');
    return `
      <li class="create-bookmark-view js-create-bookmark-view">
      <h2>Create a Bookmark</h2>
      <form id="js-add-bookmark">
        <label for="add-bookmark-title"></label>
        <input class="add-bookmark-title js-add-bookmark-title" id="add-bookmark-title" "type="text" placeholder="title">
        <label for="add-bookmark-desc"></label>
        <input class="add-bookmark-desc js-add-bookmark-desc" id="add-bookmark-desc" type="text" placeholder="longer description here">
        <label for="add-bookmark-link"></label>
        <input class="add-bookmark-link js-add-bookmark-link" id="add-bookmark-link" type="text"placeholder="http://url-address.com">
        <div action"#" id="add-star-rating js-add-star-rating">
          <div class="rate-radio-button js-rate-radio-buttons">
            <Legend>STARS</Legend>
            <input type="radio" id="5-stars"
              name="rate" value="5">
            <label for="4-stars">5</label>
            <input type="radio" id="4-stars"
              name="rate" value="5">
            <label for="4-stars">4</label>
            <input type="radio" id="3-stars"
              name="rate" value="3">
            <label for="3-stars">3</label>
            <input type="radio" id="2-stars"
              name="rate" value="2">
            <label for="2-stars">2</label>
            <input type="radio" id="1-star"
              name="rate" value="1">
            <label for="1-star">1</label>
          </div>
        </div>
        <div>
          <button class="add-button-submit js-add-button-submit" type="submit">ADD</button>
        </div>
      </form>
    </li>`;
  }


  function filterByRating() {
    
  }


  function handleCreateBookmarkClicked() {
    $('#js-create-bookmark-form').on('submit', (function(event) {
      console.log('`handleCreateBookmarkClicked` ran');
      event.preventDefault();
      store.adding = true;
      render();
    }));
  }


  function handleAddBookmarkClicked() {
    $('#js-add-bookmark').on('submit', (function(event) {
      console.log('`handleAddBookmarkClicked` ran');
      //console.log(event);
      event.preventDefault();
      //console.log(event.target);
      const data = $(event.target).serializeJson();
      api.createItem(data);
      store.addItem(data);
      store.adding = false;
      render();
    }));
  }


  function handleExpandViewClicked() {
    $('.js-bookmark-list').on('click', '.js-bookmark-list-items', event => {
      console.log('`handleExpandViewClicked` ran');
      generateExpandedView();
    // render();
    });
  }


  function handleDeleteBookmarkClicked() {
    $('.js-delete-bookmark').on('click', 'js-bookmark-list-item', event => {
      console.log('`handleDeleteBookmarkClicked` ran');
      const id = getItemIdFromElement(event.currentTarget);
      api.deleteItem(id, () => {
        store.findAndDelete(id);
      //  render();
      });
    });
  }


  function handleFilterByRatingClicked() {
    $('#js-filter-bookmark-form').on('change', function(event) {
      console.log('`handleFilterByRatingClicked` ran');
      event.preventDefault();
      const val = $(event.currentTarget).val();
      filterByRating(val);
      render();
    });
  }

  function getItemIdFromElement(item) {
    return $(item)
      .closest('.js-bookmark-list-item')
      .data('item-id');
  }

  function serializeJson(form) {
    const formData = new FormData(form);
    const o = {};
    formData.forEach((val, name) => o[name] = val);
    return JSON.stringify(o);
  }

  $.fn.extend({
    serializeJson: function() {
      const formData = new FormData(this[0]);
      const o = {};
      formData.forEach((val, name) => o[name] = val);
      return JSON.stringify(o);
    }
  });
  


  function render() {
    console.log('`render` ran');
    $('.js-bookmark-list').empty();
   
    if(store.adding) {
      const bookmarkForm = generateCreateBookmarkView();
      $('.js-bookmark-list').append(bookmarkForm);
    }

    handleAddBookmarkClicked();


    //get current items
    let items = store.items;
    //console.log(items);

    // create element string
    const bookmarkString = generateBookmarkString(items);

    //insert html into DOM
    $('.js-bookmark-list').append(bookmarkString);

  }

  function main() {
    handleExpandViewClicked();
    handleDeleteBookmarkClicked();
    handleCreateBookmarkClicked();
    handleFilterByRatingClicked();
  }

  main();


}());