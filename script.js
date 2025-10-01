const randomPage = Math.floor(Math.random() * 10) + 1;

const indianURL = `https://api.themoviedb.org/3/discover/movie?api_key=fd1eb48d0dd86e2a422b0cf68b3a89cf&with_origin_country=IN&page=${randomPage}`;
const animeURL = `https://api.themoviedb.org/3/discover/movie?api_key=fd1eb48d0dd86e2a422b0cf68b3a89cf&with_genres=16&with_original_language=ja&page=${randomPage}`;
const globalURL = `https://api.themoviedb.org/3/discover/movie?api_key=fd1eb48d0dd86e2a422b0cf68b3a89cf&page=${randomPage}`;

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}
Promise.all([
  fetch(indianURL).then((res) => res.json()),
  fetch(animeURL).then((res) => res.json()),
  fetch(globalURL).then((res) => res.json()),
]).then(([indian, anime, global]) => {
  const mixed = shuffle([
    ...indian.results,
    ...anime.results,
    ...global.results,
  ]);
  showmovies(mixed);
});
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const movieContent = document.getElementById("movie-content");
function showmovies(movies) {
  movieContent.innerHTML = "";
  movies.forEach((movie) => {
    const { poster_path, title, vote_average, overview } = movie;
    const link = document.createElement("a");
    link.href = `details.html?title=${encodeURIComponent(title)}`;
    link.classList.add("movie");
    link.innerHTML = `
  <img src="${IMGPATH + poster_path}" alt="${title}" class="movie-poster"/>
  <div class="fill-color-gradient">
    <div class="movie-info">
      <h3 class="movie-title">${title}</h3>
      <span class="movie-rating">⭐ ${vote_average.toFixed(1)}/10 IMDB</span>
    </div>
  </div>
`;
    movieContent.appendChild(link);
  });
}

const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

searchButton.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (query) {
    searchMovies(query);
  }
});

function searchMovies(query) {
  fetch(`https://api.themoviedb.org/3/search/movie?api_key=fd1eb48d0dd86e2a422b0cf68b3a89cf&query=${encodeURIComponent(query)}`)
    .then(res => res.json())
    .then(data => {
      if (data.results.length > 0) {
        showmovies(data.results);
      } else {
        document.getElementById("movies").innerHTML = "<p>No results found.</p>";
      }
    });
}