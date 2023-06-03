const {
  addToUserMoviesList,
  login,
  signup,
  getUserMoviesList,
  getUserLikedMoviesList,
  getUserDislikedMoviesList,
  addToDislikeList,
  addToLikedMovie,
  removeMovieFromList,
} = require("../controllers/userController");

const router = require("express").Router();

router.post("/login", login);

router.post("/signup", signup);

router.get("/user-movie-list", getUserMoviesList);

router.post("/add-movie-to-list", addToUserMoviesList);

router.post("/remove-movie-from-list", removeMovieFromList);

router.get("/user-liked-movies-list", getUserLikedMoviesList);

router.post("/like-movie", addToLikedMovie);

router.post("/dislike-movie", addToDislikeList);

router.get("/user-disliked-movies-list", getUserDislikedMoviesList);

module.exports = router;
