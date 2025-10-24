let searchBox = document.getElementById("search");
let searchIdButton = document.getElementById("search-id");
let searchTitleButton = document.getElementById("search-title");

class Movie {
    constructor(id, title, year, rating) {
        this.id = id;
        this.title = title;
        this.year = year;
        this.rating = rating;
    }
}

class MovieList {
    constructor() {
        this.movies = [];
        this.order = "A-Z";
    }

    addMovie(movie) {
        this.movies.push(movie);
    }

    prepareMovies() {

    }

    updateDisplay() {
        //making these values a constants might allow the js runtime to
        //hoist the switch and if statements that use these values
        const sortOrder = getSelectedSortOrder();

        const searchValue = searchBox.value;

        const searchType = (searchValue && searchValue != "") ? getSelectedSearchType() : null;

        writeMovieDisplay(
            this.movies.filter(movie => {
                switch (searchType) {
                    case "id":
                        return movie.id == searchValue;
                    case "title":
                        return movie.title.includes(searchValue);
                    default:
                        return true;
                }
            }).map((movie) => { 
                let highlights = {};
    
                switch (sortOrder) {
                    case "A-Z":
                        highlights.title = true;
                    break;
                    case "Z-A":
                        highlights.title = true;
                    break;
                    case "best-movies":
                        highlights.rating = true;
                    break;
                }

                switch (searchType) {
                    case "id":
                        highlights.id = true;
                    break;
                    case "title":
                        highlights.title = true;
                    break;
                }
    
                movie.highlights = highlights;
                return movie;
            }).sort((a, b) => {
                switch (sortOrder) {
                    case "A-Z":
                        return a.title.localeCompare(b.title);
                    case "Z-A":
                        return b.title.localeCompare(a.title);
                    case "best-movies":
                        return a.rating.localeCompare(b.rating);
                }
            })
        );
    }

    gatherMovieAdd() {
        let movie = new Movie(
            document.getElementById("movieid").value,
            document.getElementById("title").value,
            document.getElementById("year").value,
            document.getElementById("rating").value
        );

        this.addMovie(movie);

        console.log(this.movies);
    }

    searchById(id) {
        for (let i = 0; i < this.movies.length; i++) {
            if (this.movies[i].id == id) {
                return this.movies[i];
            }
        }

        return null;
    }

    searchByTitle(title) {
        let matched = [];

        array.forEach(element => {
            if (element.title.includes(title)) {
                matched.push(element);
            }
        });

        return matched;
    }


}

function writeMovieDisplay(movies) {
    let display = document.getElementById("movies");
    
    while (display.lastChild) {
        display.removeChild(display.lastChild);
    }
    
    movies.forEach(movie => {
        function createInfoField(card, name, content, className) {
            let nameElement = document.createElement("span");
            nameElement.textContent = `${name}: `;
            
            card.appendChild(nameElement);
            let span = document.createElement("span");
            span.className = className;
            span.textContent = content;
            
            card.appendChild(span);
            card.appendChild(document.createElement('br'));
        }

        let card = document.createElement("div");
        card.className = "movie-card";

        let title = document.createElement("h4");
        title.textContent = movie.title;

        if (movie.highlights?.title) {
            title.className = "highlight";
        }

        card.appendChild(title);

        createInfoField(card, "Year of release", movie.year, (movie.highlights?.year) ? "highlight" : "");
        createInfoField(card, "Rating", movie.rating, (movie.highlights?.rating) ? "highlight" : "");
        createInfoField(card, "Id", movie.id, (movie.highlights?.id) ? "highlight" : "");

        display.appendChild(card);
    });
}

function getSelectedSortOrder() {
    let radioButtons = document.querySelectorAll('input[name="sort-type"]');
    let selectedValue;
        
    for (const radioButton of radioButtons) {
        if (radioButton.checked) {
            selectedValue = radioButton.value;
            break;
        }
    }

    return selectedValue;
}

function getSelectedSearchType() {
    return (searchIdButton.checked) ? "id" : "title";
}

function sortMovies(movies) {
    switch (getSelectedSortOrder()) {
        case "A-Z":
            movies.sort((a, b) => a.title.localeCompare(b.title));
        break;
        case "Z-A":
            movies.sort((a, b) => b.title.localeCompare(a.title));
        break;
        case "best-movies":
            movies.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }

    return movies;
}



let movieList = new MovieList();

document.getElementById("add-movie").addEventListener("submit", (e) => {
    e.preventDefault();
    movieList.gatherMovieAdd();
    movieList.updateDisplay();
});

document.querySelectorAll('input[name="sort-type"]').forEach(button => {
    button.addEventListener("change", (e) => {
        e.preventDefault();
        movieList.updateDisplay();
    });
});

document.querySelectorAll('input[name="search-type"]').forEach(button => {
    button.addEventListener("change", (e) => {
        e.preventDefault();
        movieList.updateDisplay();
    });
});

searchBox.addEventListener("change", (e) => {
    movieList.updateDisplay();
})




