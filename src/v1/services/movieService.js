const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");

const dbPath = path.resolve(__dirname, "../database/movies.json");

const getAllMovies = () => {
  const data = fs.readFileSync(dbPath, "utf8");
  return JSON.parse(data).movies;
};

const saveMovies = (movies) => {
  const data = JSON.stringify({ movies }, null, 2);
  fs.writeFileSync(dbPath, data, "utf8");
};

const createMovie = (newMovieData) => {
    const movies = getAllMovies();
    const newMovie = {
      id: uuid(),
      titulo: newMovieData.titulo,
      director: newMovieData.director,
      genero: newMovieData.genero,
      año: newMovieData.año,
    };
    movies.push(newMovie);
    saveMovies(movies);
    return newMovie;
  };
  
  

const getMovieById = (movieId) => {
  const movies = getAllMovies();
  return movies.find((movie) => movie.id === movieId);
};

const updateMovie = (movieId, updates) => {
  const movies = getAllMovies();
  const index = movies.findIndex((movie) => movie.id === movieId);
  if (index === -1) {
    throw new Error("Movie not found");
  }
  const updatedMovie = { ...movies[index], ...updates };
  movies[index] = updatedMovie;
  saveMovies(movies);
  return updatedMovie;
};

const deleteMovie = (movieId) => {
  let movies = getAllMovies();
  const index = movies.findIndex((movie) => movie.id === movieId);
  if (index === -1) {
    throw new Error("Movie not found");
  }
  movies = movies.filter((movie) => movie.id !== movieId);
  saveMovies(movies);
};

module.exports = {
  getAllMovies,
  createMovie,
  getMovieById,
  updateMovie,
  deleteMovie,
};

