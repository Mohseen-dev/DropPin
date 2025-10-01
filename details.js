const params = new URLSearchParams(window.location.search);
const title = params.get("title");

fetch(
  `https://api.themoviedb.org/3/search/movie?api_key=fd1eb48d0dd86e2a422b0cf68b3a89cf&query=${title}`
)
  .then((res) => res.json())
  .then((data) => {
    const movie = data.results[0]; // assuming first match is correct
    displayMovieDetails(movie);
    fetchTrailer(movie.id);
  });

function displayMovieDetails(movie) {
  console.log(movie);
  const movieTitleNavbar = document.getElementById("movie-title-navbar");
  const movieFullDetails =
    document.getElementsByClassName("movie-full-details");
  const container = document.getElementById("movie-details");

  movieTitleNavbar.innerHTML = `
    <div id="navbar-movie-title">
      <h2>${movie.title}</h2>
      <p>Original title: ${movie.original_title}</p>
<p>Release: ${movie.release_date}</p>
    </div>
    <div id="navbar-movie-rating">
      <p>IMdb RATING<span><b>⭐ ${movie.vote_average.toFixed(
        1
      )}</b>/10</span> </p>
      <p>LANG<span><b>${movie.original_language.toUpperCase()}</b></span> </p>
    </div>
  `;

  container.innerHTML = `
    
    <div id="detail-movie-poster-div"><img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" class = "detailMovie-img"/></div>

    
  `;
  movieFullDetails[0].innerHTML = `

  <div class="movie-full-details-overview">
    <div class="movie-full-details-overview-category-button">
      <button id="category-button">Action</button>
      <button id="category-button">Comedy</button>
      <button id="category-button">Sci-Fi</button>
      <button id="category-button">Drama</button>
      <button id="category-button">Adventure</button>
      <button id="category-button">Horror</button>
    </div>
    <p> ${movie.overview}</p>
  </div>
  <div id="navbar-movie-rating-lower">
      <p><span><b>⭐ ${movie.vote_average.toFixed(1)}</b>/10</span>IMdb  </p>
      <p><span><b>${movie.original_language.toUpperCase()}</b></span> LANG</p>
    </div>
    <div class="mobile-screen-display-appearance">
    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" class = "mobile-screen-display-appearance-img"/>
    </div>

  `;
}

function fetchTrailer(movieId) {
  fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=fd1eb48d0dd86e2a422b0cf68b3a89cf`
  )
    .then((res) => res.json())
    .then((data) => {
      const trailer = data.results.find(
        (video) => video.type === "Trailer" && video.site === "YouTube"
      );
      if (trailer) {
        const trailerContainer = document.getElementById("trailer");
        trailerContainer.innerHTML = `
          <iframe id="trailer-iframe"
            src="https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=1"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen>
          </iframe>
        `;
      } else {
        console.log("No trailer found");
      }
    });
}
