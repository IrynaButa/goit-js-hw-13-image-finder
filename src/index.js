import './styles.css';
import 'material-design-icons/iconfont/material-icons.css';
import * as basicLightbox from 'basiclightbox';
import errorNotice from './js/notice.js';
import ImagesApiService from './js/apiService.js'
import getRefs from './js/refs.js';
import galleryTpl from './templates/photo-card.hbs';
import './lightboxstyles.scss';

let scroll = 0;

const refs = getRefs();
const imgApiService = new ImagesApiService();

refs.searchForm.addEventListener('submit', onInputSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);
refs.cardsContainer.addEventListener('click', onOpenModal);


function onOpenModal(event) {
  event.preventDefault();
  if (event.target.nodeName !== 'IMG') {
      return;
    }    
  const largeImageURL = event.target.src;
  //console.log(largeImageURL);
    createModal(largeImageURL);
  }

  function createModal(image) {
    const instance = basicLightbox.create(`<img src="${image}" >`);
    instance.show();
}

function onInputSearch(e) {
    e.preventDefault();
  clearCardContainer();
  imgApiService.resetPage();
  imgApiService.query = e.currentTarget.elements.query.value;
  
  if (imgApiService.query === '') {
      refs.cardsContainer.innerHTML = '';
       errorNotice();
      return;
    }
  scroll = 0;
  fetchQuery();

}
function onLoadMore() {
scroll = refs.cardsContainer.offsetHeight;
  fetchQuery(); 
  
}
function fetchQuery() {
  imgApiService.fetchImg()
        .then(hits => {
      if (hits.length < 12) {
        refs.loadMoreBtn.classList.add('is-hidden');
      } else refs.loadMoreBtn.classList.remove('is-hidden');
          renderImgCard(hits);
          scrollWin(scroll); 
    }).finally(setTimeout(clearInput, 5000));
  
}
function renderImgCard(hits) {
  refs.cardsContainer.insertAdjacentHTML('beforeend', galleryTpl(hits));
  
}
function clearCardContainer() {
  refs.cardsContainer.innerHTML = "";
}
function clearInput() {
  refs.input.value = "";
}
function scrollWin(scroll) {
window.scrollTo({
    top: scroll,
    behavior: "smooth"
});
}
