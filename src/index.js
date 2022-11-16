
import SimpleLightbox from 'simplelightbox';
import NewsAPIService from './fetchimages';
import Notiflix from 'notiflix';
import "simplelightbox/dist/simple-lightbox.min.css";
import "./css/gallery.css";

const refs = {
    formSearch: document.querySelector('#search-form'),
    inputSearch: document.querySelector('input[name="searchQuery"]'),
    btnSubmit: document.querySelector('button[type="submit"]'),
    btnLoadMore: document.querySelector('.load-more'),
    galleryFn: document.querySelector('.gallery'),
};


const newsAPIService = new NewsAPIService();


refs.formSearch.addEventListener('submit', onSearch);
refs.btnLoadMore.addEventListener('click', onLoadMore);

function onSearch(event) {

    event.preventDefault();

    clearGalleryFn();

    newsAPIService.query = refs.inputSearch.value.trim();
    if (newsAPIService.query == "") {
        return onSearchError();
    };

    newsAPIService.resetPage();
    newsAPIService.fetchImages()
        .then(data => {
            if (data.length == 0) {
                return onSearchError();
            } else {
                refs.btnLoadMore.removeAttribute('hidden');
                styleBtnLoadMore();
                return appendFitsCards(data)
            }

        });

};

function onLoadMore() {

    newsAPIService.fetchImages()
        .then(appendFitsCards)
};

function onSearchError() {
    Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
};

function clearGalleryFn() {
    refs.btnLoadMore.setAttribute("hidden", "hidden");

    refs.galleryFn.innerHTML = '';
}


function appendFitsCards(itemCard) {
    const itemcard = itemCard.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
        return `<div class="photo-card">
    <a class="gallery__item" href="${largeImageURL}">
  <img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy" />
  </a>
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
        ${likes}
    </p>
    <p class="info-item">
      <b>Views</b>
       ${views}
    </p>
    <p class="info-item">
      <b>Comments</b>
      ${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>
      ${downloads}
    </p>
    </div>
    </div>   `
    }).join('');

    refs.galleryFn.insertAdjacentHTML('beforeend', itemcard);
    let item = refs.galleryFn.getElementsByClassName('gallery__item');

    let gallerySimpleBox = new SimpleLightbox(item);
    open.gallerySimpleBox;
};

function styleBtnLoadMore() {
    const btn = refs.btnLoadMore;
    btn.style.margin = "100px auto 0 auto";
    btn.style.display = 'block';
    btn.style.backgroundColor = 'hsl(219, 89%, 36%)';
    btn.style.color = 'white';
}