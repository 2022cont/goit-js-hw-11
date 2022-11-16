import axios from 'axios';
import Notiflix from 'notiflix';

export default class NewsAPIService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
        this.totalHits = 0;
    }

    fetchImages() {
        const BASE_URL = 'https://pixabay.com/api';
        const API_KEY = '31255927-4de5778e57c1de2feb517f55b';
        const ParametersSearch = 'image_type=photo&orientation=horizontal&safesearch=true&per_page=40';

        async function fetchImages(q, page) {
            const response = await axios(`${BASE_URL}/?key=${API_KEY}&q=${q}&${ParametersSearch}&page=${page}`);
            return (response);
        }

        return fetchImages(this.searchQuery, this.page)
            .then(data => {
                this.totalHits = data.data.totalHits;
                this.incrimentPage();
                return (data.data.hits);
            })

    }

    getTotalHits() {
        return this.totalHits;
    }

    incrimentPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }

    get query() {
        return this.searchQuery
    };

    set query(newQuery) {
        this.searchQuery = newQuery
    };

}

