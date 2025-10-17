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
                break
            }
        }
        
        switch (selectedValue) {
            case "A-Z":
                this.movies.sort((a, b) => { a.title.localeCompare(b.title) });
            case "Z-A":
                this.movies.sort((a, b) => { b.title.localCompare(a.title) });
            case "best-movies":
                this.movies.sort((a, b) => {a.rating.localCompare(b.rating)});
        }
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
        for (let i = 0; i < this.movies.Length; i++) {
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
});

document.getElementById("sort-movies").addEventListener("changed", (e) => {
    e.preventDefault();
    movieList.sort();
});



