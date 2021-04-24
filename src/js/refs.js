export default function getRefs() {
    return {
    searchForm: document.querySelector('.search-form'),
    cardsContainer: document.querySelector('.gallery'),
        input: document.querySelector('.clear-input'),
        photoCard: document.querySelector('.photo-card'),
    lightbox: document.querySelector('.lightbox'),
    loadMoreBtn: document.querySelector('[data-action="load-more"]'),
};
}

