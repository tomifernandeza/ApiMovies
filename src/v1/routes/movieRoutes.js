const express = require("express");
const movieController = require("../controllers/movieController");

const router = express.Router();

router.get("/", movieController.getAllMovies);
router.post("/", movieController.createMovie);
router.get("/:movieId", movieController.getMovieById);
router.put("/:movieId", movieController.updateMovie);
router.delete("/:movieId", movieController.deleteMovie);

module.exports = router;
