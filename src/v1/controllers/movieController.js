const movieService = require("../services/movieService");

const getAllMovies = (req, res) => {
  try {
    const movies = movieService.getAllMovies();
    res.send({ status: "OK", data: movies });
  } catch (error) {
    res.status(500).send({ status: "FAILED", data: { error: error.message } });
  }
};

const createMovie = (req, res) => {
  const { body } = req;
  if ( !body.titulo || !body.director || !body.año) {
    res.status(400).send({ status: "FAILED", data: { error: "Missing required fields" } });
    return;
  }
  try {
    const newMovie = movieService.createMovie(body);
    res.status(201).send({ status: "OK", data: newMovie });
  } catch (error) {
    res.status(500).send({ status: "FAILED", data: { error: error.message } });
  }
};

const getMovieById = (req, res) => {
  const { movieId } = req.params;
  try {
    const movie = movieService.getMovieById(movieId);
    if (!movie) {
      res.status(404).send({ status: "FAILED", data: { error: "Movie not found" } });
      return;
    }
    res.send({ status: "OK", data: movie });
  } catch (error) {
    res.status(500).send({ status: "FAILED", data: { error: error.message } });
  }
};

const updateMovie = (req, res) => {
  const { movieId } = req.params;
  const { body } = req;
  try {
    const updatedMovie = movieService.updateMovie(movieId, body);
    res.send({ status: "OK", data: updatedMovie });
  } catch (error) {
    res.status(500).send({ status: "FAILED", data: { error: error.message } });
  }
};

const deleteMovie = (req, res) => {
  const { movieId } = req.params;
  try {
    movieService.deleteMovie(movieId);
    res.status(204).send({ status: "OK" });
  } catch (error) {
    res.status(500).send({ status: "FAILED", data: { error: error.message } });
  }
};

module.exports = {
  getAllMovies,
  createMovie,
  getMovieById,
  updateMovie,
  deleteMovie,
};
