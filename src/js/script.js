{
  'use strict';

  const templates = {
    bookList: Handlebars.compile(document.querySelector('#template-book').innerHTML),
  };

  class BooksList{

    constructor(){
      const thisBooksList = this;
      // thisBooksList.favouriteBooks = [];
      // thisBooksList.filters = [];
      // thisBooksList.formFilters = document.querySelector('.filters');
      thisBooksList.getElements();
      thisBooksList.renderInMenu();
      thisBooksList.initActions();
      // thisBooksList.determineRatingBgc();
      thisBooksList.filterBooks();


    }

    initData(){
      this.data = dataSource.books;
    }

    getElements(){
      const thisBooksList = this;

      thisBooksList.favouriteBooks = [];
      thisBooksList.filters = [];
      thisBooksList.formFilters = document.querySelector('.filters');
    }

    renderInMenu(){
      const thisBooksList = this;
      for(let book of dataSource.books){
        // console.log(book);
        book.ratingWidth = book.rating * 10;
        // console.log(book.ratingWidth);
        book.ratingBgc = thisBooksList.determineRatingBgc(book);
        const generatedHTML = templates.bookList(book);
        // console.log(generatedHTML);
        const generatedDOM = utils.createDOMFromHTML(generatedHTML);
        const bookContainer = document.querySelector('.books-list');
        bookContainer.appendChild(generatedDOM);

      }
      // const bookFill = document.querySelector('book__rating__fill');
    }

    // renderInMenu();

    // const favouriteBooks = [];
    // const filters = [];
    // const formFilters = document.querySelector('.filters');

    initActions(){
      const thisBooksList = this;
      const booksPhotoList = document.querySelectorAll('.book__image');
      for(let bookPhoto of booksPhotoList){
        // console.log(bookPhoto);
        bookPhoto.addEventListener('dblclick', function(event){
          // if(event.target.offsetParent.classList.contains('.book__image')){
          event.preventDefault();
          let bookPhotoId = bookPhoto.getAttribute('data-id');
          if(!thisBooksList.favouriteBooks.includes(bookPhotoId)){
            bookPhoto.classList.add('favourite');
            thisBooksList.favouriteBooks.push(bookPhotoId);
            // console.log(favouriteBooks);
          } else if(thisBooksList.favouriteBooks.includes(bookPhotoId)){
            thisBooksList.favouriteBooks.pop(bookPhotoId);
            bookPhoto.classList.remove('favourite');
          }
          // }
        });
      }
      thisBooksList.formFilters.addEventListener('click', function(event){
        if(event.target && event.target.tagName == 'INPUT' && event.target.type == 'checkbox' && event.target.name == 'filter'){
          if(event.target.checked){
            thisBooksList.filters.push(event.target.value);
          } else {
            thisBooksList.filters.pop(event.target.value);
          }
          thisBooksList.filterBooks();
        }
        // console.log(filters);
      });

    }


    filterBooks(){
      const thisBooksList = this;
      // debugger;

      for(let book of dataSource.books){
        const bookImage = document.querySelector('.book__image[data-id="' + book.id + '"]');
        // console.log(book.details.adults);
        let shouldBeHidden = false;
        for(const filter of thisBooksList.filters){

          if(!book.details[filter]){
            shouldBeHidden = true;
            break;
          }
        }
        if(shouldBeHidden){

          bookImage.classList.add('hidden');
        } else {
          bookImage.classList.remove('hidden');
        }
        //     // const values = Object.values(book.details);
        //     // const bookImage = document.querySelector('.book__image')
        //     // if(values[0] == true && values[1] == false && filters.includes('adults')){
        //     //   bookImage.classList.add('hidden');
        //     // } else {
        //     //   bookImage.classList.remove('hidden');
        //     // }
      }
    }
    // }
    determineRatingBgc(book){
      const thisBooksList = this;
      // console.log(thisBooksList);
      let rating = book.rating;
      // console.log(rating);
      let background = '';
      if (rating < 6) {
        background = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%);';
      }
      if (rating > 6 && rating <= 8) {
        background = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%);';
      }
      if (rating > 8 && rating <= 9) {
        background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%);';
      }
      if (rating > 9) {
        background = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%);';
      }

      return background;
    }
  }

  const app = new BooksList();
  app.initData();
}
