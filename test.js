const API_KEY = "AIzaSyAOmh1voRgVeBYy6GtWnMeYSwdgOEvuF74";

const searchResults = document.getElementById('search-results');
let favorites = [];

async  function getBookData(query, page = 1, itemsPerPage = 5){
    const startIndex = (page - 1) * itemsPerPage;
  
    const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&startIndex=${startIndex}&maxResults=${itemsPerPage}&key=${API_KEY}`)  
        .then(response => response.json())
        .then(data => {
            searchResults.innerHTML ='';
            data.items.forEach(item => {
              const li = document.createElement('li');
              li.style.display = 'flex';
              li.style.flexDirection = 'column';
              li.style.columnGap = '16px';
              li.style.rowGap = '20px';
            
              const title = item.volumeInfo.title;
              const author = item.volumeInfo.authors?.[0] || 'Unknown author';
              const img = item.volumeInfo.imageLinks?.thumbnail;
              const link = item.volumeInfo.previewLink;
              
              li.innerHTML = `
                <div class="info">
                   <img src="${img}" onclick="window.open('${item.volumeInfo.infoLink}', '_blank');">
              
                   <div class="details">
                        <div class="title"> Title : ${title} </div>
                        <a href="${link}" target="_blank"> Read the book </a>
                        <div class="author"> By the author : ${author} </div>
                        <button class="btn2"> Favorite </button>
                    </div>
                </div>
              `;
              const bookContainer = li.querySelector('.info');
              const addToFavoritesButton = bookContainer.querySelector('.btn2');
              addToFavoritesButton.addEventListener('click', () => {
                addToFavorites(item);
                addToFavoritesButton.innerHTML = '<i class="fa-solid fa-heart" style="color: #ff0000;"></i>';
              });
              searchResults.appendChild(li);
              console.log(li);
              bookContainer.appendChild(addToFavoritesButton);
              searchResults.appendChild(bookContainer); 

            });  
            

            const totalPages = Math.ceil(data.totalItems / itemsPerPage);
            const pagination = document.getElementById('pagination-links');
            pagination.innerHTML = '';
            for (let i = 1; i <= totalPages; i++) {
            const link = document.createElement('a');
            link.innerText = i;
            link.classList.add('page-link');
            if (i === page) {
            link.classList.add('active');
            }
            link.addEventListener('click', () => {
            getBookData(query, i, itemsPerPage);
            });
            pagination.appendChild(link);
            }
        });

        
}



    
    
function getSelectedRadio(){
    var author = document.querySelector( 'input[name="author"]:checked');
    var title = document.querySelector( 'input[name="title"]:checked');
    const searchTerm = document.getElementById('input').value;
    let query = '';


    if(searchTerm === ''){
        displayError();
        return;
    }
    if (author!=null) {
        query += `inauthor:"${searchTerm}"`;
        console.log(searchTerm);
    }
    if (title!=null) {
        console.log(searchTerm);
        query += `intitle:"${searchTerm}"`;
    }
    getBookData(query);
}

//handling error for empty search box
function displayError() {
    alert("search term can not be empty!")
}

function addToFavorites(item) {
    favorites.push(item);
    localStorage.setItem('favorites', JSON.stringify(favorites));
}
if (localStorage.getItem('favorites')) {
    favorites = JSON.parse(localStorage.getItem('favorites'));
}




 










  

  



      