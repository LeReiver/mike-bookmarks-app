/* global store api $ */
'use strict';

const bookmarkList = (function() {

  function generateBookmarkElement(item) {
    return `
      <li class="bookmark-list-items js-bookmark-list-items" data-item-id="${item.id}">
      <h3 class="list-title js-list-title">${item.title}</h3>
      <a class="list-link js-list-link" href="${item.url}" target="_blank">${item.url}</a>
      <section class="star-rating js-star-rating">
        <p class="star-number js-star-number">${item.rating} STARS</p>
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
      <h2>${item.title}</h2>
      <form id="js-close-expanded" class="header-right js-header-right">
        <p class="expanded-stars js-expanded-stars">${item.rating} STARS</p>
        <button class="close-button js-close-button" type="submit">Close</button>
      </form>
      <p class="long-desc js-long-desc">${item.desc}</p>
      <a class="bookmark-link js-bookmark-link" href="${item.url}" target="_blank">${item.url}</a>
      <div> 
          <a class="bookmark-link js-bookmark-link" href="${item.url}" target="_blank">
          <button class="visit-site-button js-visit-site-button">VISIT</button></a>
      </div>
      <form id="js-delete-bookmark">
        <button class="delete-bookmark-button js-delete-bookmark-button" type="submit">DELETE</button>
      </form>
    </li>`;
  } 

 
  function generateCreateBookmarkView() {
    return `
      <li class="create-bookmark-view js-create-bookmark-view">
      <h2>Create a Bookmark</h2>
      <form id="js-close-expanded" class="close-header-right js-header-right">
        <button class="create-close-button js-close-button" type="submit">Close</button>
      </form>
      <form id="js-add-bookmark">
        <label for="add-bookmark-title"></label>
        <input class="add-bookmark-title js-add-bookmark-title" id="add-bookmark-title" name="title" type="text" placeholder="title" required>
        <label for="add-bookmark-desc"></label>
        <input class="add-bookmark-desc js-add-bookmark-desc" id="add-bookmark-desc" name="desc" type="text" placeholder="longer description here">
        <label for="add-bookmark-link"></label>
        <input class="add-bookmark-link js-add-bookmark-link" id="add-bookmark-link" name="url" type="text"placeholder="http://url-address.com" requried>
        <div id="add-star-rating js-add-star-rating">
          <div class="rate-radio-button js-rate-radio-buttons" >
            <Legend required>STARS</Legend>
            <input type="radio" id="5-stars"
              name="rate" value="5" required>
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

  function handleCreateBookmarkClicked() {
    $('#js-create-bookmark-form').on('submit', (function(event) {
      event.preventDefault();
      store.adding = true;
      render();
    }));
  }


  function handleCloseBookmarkClicked() {
    $('#js-close-expanded').on('click', '.js-bookmark-list-item', event => {
      event.preventDefault();
      console.log(getItemIdFromElement(event.currentTarget));
      const id = getItemIdFromElement(event.currentTarget);
      console.log(id);
      let item = store.findById(id);
      store.closing = true;
      if (store.closing && item.id === id) {
        render();
        store.closing = false;
      }
    });
  }


  function handleAddBookmarkClicked() {
    $('#js-add-bookmark').on('submit', (function(event) {
      event.preventDefault();
      const title = event.currentTarget.title.value;
      const url = event.currentTarget.url.value;
      const desc = event.currentTarget.desc.value;
      const rate = event.currentTarget.rate.value;

      api.createItem(title, url, desc, rate, function(response) {
        store.addItem(response);
        store.adding = false;
        render();
      });
    }));
  }


  function handleExpandViewClicked() {
    $('.js-bookmark-list').on('click', '.js-bookmark-list-items', event => {
      const id = getItemIdFromElement(event.currentTarget);
      let item = store.findById(id);
      store.expanded = true;
      if (store.expanded && item.id === id) {
        const expandView = generateExpandedView(item);
        expandView;
        if(store.expanded) {
          $('.js-bookmark-list').prepend(expandView);
        }
      }
    });
  }


  function handleDeleteBookmarkClicked() {
    $('#js-delete-bookmark').on('submit', '.js-bookmark-list-item', event => {
      console.log('delete clicked');
      event.preventDefault();
      console.log(getItemIdFromElement(event.currentTarget));
      const id = getItemIdFromElement(event.currentTarget);
      console.log(id);
      let item = store.findById(id);
      store.deleting = true;
      if (store.deleting && item.id === id) {
        api.deleteItem(id, function(response) {
          store.findAndDelete(response);
          store.deleting = false;
          render();
        });
      }
    });
  }


  function handleFilterByRatingClicked() {
    $('.js-header-select').on('change', function(event) {
      event.preventDefault();
      const val = $(event.currentTarget).val();
      console.log(val);
      store.filterByRating(val[0]);
      render();
    });
  }

  function getItemIdFromElement(item) {
    return $(item)
      .closest('.js-bookmark-list-items')
      .data('item-id');
  }


  function render() {
    $('.js-bookmark-list').empty();
   
    if(store.adding) {
      const bookmarkForm = generateCreateBookmarkView();
      $('.js-bookmark-list').prepend(bookmarkForm);
    }

    handleAddBookmarkClicked();

    handleDeleteBookmarkClicked();

    //get current items
    let items = store.items;
    //console.log(items);

    // create element string
    const bookmarkString = generateBookmarkString(items);

    //insert html into DOM
    $('.js-bookmark-list').append(bookmarkString);

  }

  function bindEventListeners() {
    handleExpandViewClicked();
    handleCreateBookmarkClicked();
    handleFilterByRatingClicked();
    handleCloseBookmarkClicked();
  }

  return {
    bindEventListeners,
    render
  };

}());