{
  'use strict';

  const templates = {
    bookList: Handlebars.compile(document.querySelector('#template-book').innerHTML),
  };

  class BooksList{

    constructor(){
      const thisBooksList = this;

      thisBooksList.getElements();
      thisBooksList.renderInMenu();
      thisBooksList.initActions();



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
        book.ratingWidth = book.rating * 10;
        book.ratingBgc = thisBooksList.determineRatingBgc(book);
        const generatedHTML = templates.bookList(book);
        const generatedDOM = utils.createDOMFromHTML(generatedHTML);
        const bookContainer = document.querySelector('.books-list');
        bookContainer.appendChild(generatedDOM);

      }
    }



    initActions(){
      const thisBooksList = this;
      const booksPhotoList = document.querySelectorAll('.book__image');
      for(let bookPhoto of booksPhotoList){
        bookPhoto.addEventListener('dblclick', function(event){
          event.preventDefault();
          let bookPhotoId = bookPhoto.getAttribute('data-id');
          if(!thisBooksList.favouriteBooks.includes(bookPhotoId)){
            bookPhoto.classList.add('favourite');
            thisBooksList.favouriteBooks.push(bookPhotoId);
          } else if(thisBooksList.favouriteBooks.includes(bookPhotoId)){
            thisBooksList.favouriteBooks.pop(bookPhotoId);
            bookPhoto.classList.remove('favourite');
          }
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
      });

    }


    filterBooks(){
      const thisBooksList = this;

      for(let book of dataSource.books){
        const bookImage = document.querySelector('.book__image[data-id="' + book.id + '"]');
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
      }
    }

    determineRatingBgc(book){
      let rating = book.rating;
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
