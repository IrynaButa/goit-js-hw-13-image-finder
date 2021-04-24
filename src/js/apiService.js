import errorNotice from './notice.js'

const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '20567405-620e455a5abdf9a1e5e5f188a';

export default class ImagesApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;

     }
    fetchImg() {
    return fetch(`${BASE_URL}/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`)
        .then(response =>
    response.json(),
    ).then(({ hits }) => {
        
        this.nextPage();
        
        return hits;
    })
        .catch(errorNotice);
    }
    nextPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }
    get query() {
        return this.searchQuery;
    }
    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}



 
// async function fetchImg(image) {
//     try {
//         const response = await fetch(`${BASE_URL}/?image_type=photo&orientation=horizontal&q=${image}&page=${page}&per_page=12&key=${API_KEY}`);
      
//         const images = await response.json();
//         return images;
//     }
//     catch (errorNotice) { }};

