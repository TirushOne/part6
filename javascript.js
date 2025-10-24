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

    sort() {
        let radioButtons = document.querySelectorAll('input[name="sort-type"]');
        let selectedValue;
        
        for (const radioButton of radioButtons) {
            if (radioButton.checked) {
                selectedValue = radioButton.value;
                break;
            }
        }

        console.log(selectedValue);
        
        switch (selectedValue) {
            case "A-Z":
                this.order = "A-Z";
                this.movies.sort((a, b) => a.title.localeCompare(b.title));
                console.log(this.movies);
                break;
            case "Z-A":
                this.order = "Z-A";
                this.movies.sort((a, b) => b.title.localeCompare(a.title));
                console.log(this.movies);
                break;
            case "best-movies":
                this.order = "best";
                this.movies.sort((a, b) => a.title.localeCompare(b.title));
                console.log(this.movies);
                break;
        }
    }

    writeDisplay() {
        function updateMovieDisplay(movies) {
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
        
                createInfoField(card, "Year of release", movie.year, (movies.highlights?.year) ? "highlight" : "");
                createInfoField(card, "Rating", movie.rating, (movies.highlights?.rating) ? "highlight" : "");
                createInfoField(card, "Id", movie.id, (movies.highlights?.rating) ? "highlight" : "");
        
                display.appendChild(card);
            });
        }

        let mapped_movies = this.movies.map((movie) => { 
            let highlights;

            switch (this.order) {
                case "A-Z":
                    highlights = {
                        "title":true
                    };
                break;
                case "Z_A":
                    highlights = {
                        "title":true
                    };
                break;
                default:
                    highlights = {
                        "rating":true
                    };
                break;
            }

            movie.highlights = highlights;
            return movie;
        });

        updateMovieDisplay(
            mapped_movies
        )
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

let movieList = new MovieList();

document.getElementById("add-movie").addEventListener("submit", (e) => {
    e.preventDefault();
    movieList.gatherMovieAdd();
    movieList.sort();
    movieList.writeDisplay();
});

document.querySelectorAll('input[name="sort-type"]').forEach(button => {
    button.addEventListener("change", (e) => {
        console.log("changed");
        e.preventDefault();
        movieList.sort();
        movieList.writeDisplay();
    });
});




