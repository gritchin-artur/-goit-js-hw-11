import { Notify } from 'notiflix/build/notiflix-notify-aio';
import Notiflix from 'notiflix';
import { fetchGalaryByBree } from './animal-api';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const form = document.querySelector('.search-form');
const buttonSearch = document.querySelector('[type="submit"]');
const buttonLoadMore = document.querySelector('[type="button"]');
const inputForm = document.querySelector('input');
const div = document.querySelector('.gallery')

   const lightbox = new SimpleLightbox('.gallery a', {
        captionsData: "alt",
        animationSpeed: '250',
        captionPosition: 'bottom',
    });

buttonLoadMore.style.display = 'none';


// =============================Scroll==========================
const target = document.querySelector('.js-guard');
let options = {
  root: null,
  rootMargin: "200px",
  threshold: 1.0,
};

let topic = '';
 let pages = 1;
let observerv = new IntersectionObserver(onLoad, options);

function onLoad(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      pages++;
      fetchGalaryByBree(topic, pages)
          .then((lists) => {
            imagList(lists)
            if (lists.hits === lists.totalHits) {
              observer.unobserve(target);
            } 
    })
       .catch((error) => {
              Notify.failure("Sorry, there are no images matching your search query. Please try again.")
})
  }
})
}

        
// ==========================Search images==========================
buttonSearch.addEventListener('click', (event) => {
  clearArticlesContainer();
  pages = 1;
    event.preventDefault();
  topic = inputForm.value;
  fetchGalaryByBree(topic, pages)
    .then((lists) => {
      imagList(lists)
      observerv.observe(target)
  //      if (lists.hits !== lists.totalHits) {
  //   buttonLoadMore.style.display = 'block';
  // }
    })
       .catch((error) => {
              Notify.failure("Sorry, there are no images matching your search query. Please try again.")
       }) 
});
    
//  ============================Images list===========================
function imagList(lists) {
  console.log(lists)
        const markup = lists.hits
          .map((list) => {
            return `<div class="photo-card">
          <a class="gallery-item" href="${list.largeImageURL}">
  <img src="${list.webformatURL}" alt="${list.tags}" loading="lazy" width="243" height="180"/></a>
  <div class="info">
    <p class="info-item">
      <b>Likes ${list.likes}</b>
    </p>
    <p class="info-item">
      <b>Views ${list.views}</b>
    </p>
    <p class="info-item">
      <b>Comments ${list.comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads ${list.downloads}</b>
    </p>
  </div>
</div>`;
    })
          .join("");
  div.insertAdjacentHTML("beforeend", markup);
  lightbox.refresh();
};

        // ===============Button "Load More"========================


// buttonLoadMore.addEventListener('click', onClickLoadMore);

// function onClickLoadMore() {
//   pages++;
//   fetchGalaryByBree(pages)
//     .then((lists) => {
//       catList(lists)
//        if (lists.hits === lists.totalHits) {
//     buttonLoadMore.style.display = 'none';
//   }
//     })
//     .catch(() => {
//               Notify.failure("Sorry, there are no images matching your search query. Please try again.")
//           });

// };

function clearArticlesContainer() {
  div.innerHTML = '';
};
