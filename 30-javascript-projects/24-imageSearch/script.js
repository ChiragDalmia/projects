const access_id = 'axjLaTSDxblf9EJSs1sOzXw-3VJ8YPauEFlO_uzElHc';
const searchForm = document.getElementById('search-form'),
      searchBox = document.getElementById('search-box'),
      searchResult = document.getElementById('search-result'),
      showMoreBtn = document.getElementById('show-more-btn');

let keyword = '';
let page = 1;
const imagesPerPage = 12;

async function searchImages() {
  if (searchBox.value === '') {
    
      showMoreBtn.style.display = 'none';
    return;
  }
    keyword = searchBox.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${access_id}&per_page=${imagesPerPage}}`;

    const res = await fetch(url);
    const data = await res.json();
    const images = data.results;

   
    if(page === 1) searchResult.innerHTML = '';

    images.forEach((image) => {
        const img = document.createElement('img');
        img.src = image.urls.regular;
        const imageLink = document.createElement('a');
        imageLink.href = image.links.html;
        imageLink.target = '_blank';
        imageLink.appendChild(img);
        searchResult.appendChild(imageLink);
    });
    // show more button if there is successfully loaded images
    if(images.length > 0) {
        showMoreBtn.style.display = 'block';
    } else {
        showMoreBtn.style.display = 'none';
    }
      
    
    
}

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    page = 1;
    searchImages();
});

showMoreBtn.addEventListener('click', () => {

    page++;
    searchImages();
});
