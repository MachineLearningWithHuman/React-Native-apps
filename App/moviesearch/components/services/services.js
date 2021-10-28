import axios from 'axios';

const apiUrl = 'https://api.themoviedb.org/3';
const apiKey = 'api_key=9dad356622c2804afc1890c78e354f07';
// Get Popular Movies
export const getPopularMovies = async () => {
  const resp = await axios.get(`${apiUrl}/movie/popular?${apiKey}`);
  return resp.data.results;
};

// Get Upcoming Movies
export const getUpcomingMovies = async () => {
  const resp = await axios.get(`${apiUrl}/movie/upcoming?${apiKey}`);
  return resp.data.results;
};

// Get Popular TV
export const getPopularTv = async () => {
  const resp = await axios.get(`${apiUrl}/tv/popular?${apiKey}`);
  return resp.data.results;
};

// Get Family Movies
export const getFamilyMovies = async () => {
  const resp = await axios.get(
    `${apiUrl}/discover/movie?${apiKey}&with_genres=10751`,
  );
  return resp.data.results;
};

// Get Documnetery Movies
export const getDocumentaryMovies = async () => {
  const resp = await axios.get(
    `${apiUrl}/discover/movie?${apiKey}&with_genres=99`,
  );
  return resp.data.results;
};

// Get Movies
export const getMovies = async id => {
  const resp = await axios.get(`${apiUrl}/movie/${id}?${apiKey}`);
  return resp.data;
};

// search for movies and tv shows
export const searchMovieTv = async (query, type) => {
  const resp = await axios.get(
    `${apiUrl}/search/${type}?${apiKey}&query=${query}`,
  );
  return resp.data.results;
};

// Get Movies recommendation
export const getMovieRecommendation = async id => {
  const resp = await axios.get(
    `${apiUrl}/movie/${id}/recommendations?${apiKey}`,
  );
  return resp.data.results;
};

// Get similar Movies
export const getSimilarMovie = async id => {
  const resp = await axios.get(`${apiUrl}/movie/${id}/similar?${apiKey}`);
  return resp.data.results;
};

export const getSimilarTv = async id => {
  const resp = await axios.get(`${apiUrl}/tv/${id}/similar?${apiKey}`);
  return resp.data.results;
};

export const getTvRecommendation = async id => {
  const resp = await axios.get(`${apiUrl}/tv/${id}/recommendations?${apiKey}`);
  return resp.data.results;
};

// search for movies and tv shows
export const TrendingMovieTv = async (time_window, type) => {
  const resp = await axios.get(
    `${apiUrl}/trending/${type}/${time_window}?${apiKey}`,
  );
  return resp.data.results;
};

// Discover Movies
export const discoverMovies = async () => {
  const resp = await axios.get(`${apiUrl}/discover/movie?${apiKey}`);
  return resp.data.results;
};

//Tv related services

export const discoverTv = async () => {
  const resp = await axios.get(`${apiUrl}/discover/tv?${apiKey}`);
  return resp.data.results;
};

// Get Tv
export const getTv = async id => {
  const resp = await axios.get(`${apiUrl}/tv/${id}?${apiKey}`);
  return resp.data;
};
