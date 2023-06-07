import axios from "axios";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export async function fetchGalaryByBree(topic, pages) {
  KEY = '36910570-35daf5d8a5ff9002bcd25fc68';
  URL = 'https://pixabay.com/api/';
   console.log(topic)
  console.log(pages)
    try {
        const response = await axios.get(
            `${URL}/?key=${KEY}&q=${topic}&image_type=photo&orientation=horizontal&safesearch=true&page=${pages}&per_page=40`
        );
        return response.data;
  } catch (error) {
    Notify.failure("We're sorry, but you've reached the end of search results.")
    }

};
 


