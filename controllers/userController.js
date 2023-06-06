const User = require("../models/userModel");
const bcrypt = require("bcrypt");

async function getUserMoviesList(req, res) {
  try {
    const mail = req.query.mail;
    const user = await User.findOne({ email: mail });
    if (!user) {
      return res.json({ message: "user not found" });
    }
    return res.json({ message: "success", movies: user.ListMovies });
  } catch (error) {
    return res.json({ message: "Error fetching movies" });
  }
}

async function getUserLikedMoviesList(req, res) {
  try {
    const mail = req.query.mail;
    const user = await User.findOne({ email: mail });
    if (!user) {
      return res.json({ message: "user not found" });
    }
    return res.json({ message: "success", movies: user.likedMovies });
  } catch (error) {
    return res.json({ message: "Error fetching movies" });
  }
}

async function getUserDislikedMoviesList(req, res) {
  try {
    const mail = req.query.mail;
    const user = await User.findOne({ email: mail });
    if (!user) {
      return res.json({ message: "user not found" });
    }
    return res.json({ message: "success", movies: user.DislikedMovies });
  } catch (error) {
    return res.json({ message: "Error fetching movies" });
  }
}

async function signup(req, res) {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashedPassword,
    });


    const saveUser = await newUser.save();
    if (saveUser) {
      return res.json({ message: "user created", userData: newUser });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function login(req, res) {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    return res
      .status(200)
      .json({ message: "Login successful", userData: user });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function addToUserMoviesList(req, res) {
  try {
    const { mail, data } = req.body;

    const user = await User.findOne({ email: mail });
    if (!user) {
      return res.json({ message: "User not found" });
    }
    const { ListMovies } = user;

    const movieAlreadyOnList = ListMovies.find(({ id }) => id === data.id);

    if (movieAlreadyOnList) {
      return res.json({ message: "Movie already exist on List" });
    }

    const updateList = await User.findByIdAndUpdate(
      user._id,
      { ListMovies: [...user.ListMovies, data] },
      { new: true }
    );

    return res
      .status(200)
      .json({ message: "Movie added successful", userUpdatedData: updateList });
  } catch (error) {
    return res.json({ message: "Error adding movie" });
  }
}

async function addToLikedMovie(req, res) {
  try {
    const { mail, data } = req.body;

    const user = await User.findOne({ email: mail });
    if (!user) {
      return res.json({ message: "User not found" });
    }

    const { DislikedMovies } = user;

    const { likedMovies } = user;

    if (DislikedMovies) {
      const movieIndex = DislikedMovies.findIndex(({ id }) => id === data.id);
      if (movieIndex > -1) {
        DislikedMovies.splice(movieIndex, 1);
        await User.findByIdAndUpdate(
          user._id,
          { DislikedMovies: DislikedMovies },
          { new: true }
        );
      }
    }

    const movieAlreadyLiked = likedMovies.find(({ id }) => id === data.id);

    if (movieAlreadyLiked) {
      return res.json({ message: "Movie already exist on List" });
    }

    const updateList = await User.findByIdAndUpdate(
      user._id,
      { likedMovies: [...user.likedMovies, data] },
      { new: true }
    );

    return res.status(200).json({
      message: "Movie added successfully",
      userUpdatedData: updateList,
    });
  } catch (error) {
    return res.json({ message: "Error adding movie" });
  }
}

async function addToDislikeList(req, res) {
  try {
    const { mail, data } = req.body;

    const user = await User.findOne({ email: mail });
    if (!user) {
      return res.json({ message: "User not found" });
    }
    const { DislikedMovies } = user;

    const { likedMovies } = user;

    if (likedMovies) {
      const movieIndex = likedMovies.findIndex(({ id }) => id === data.id);
      if (movieIndex > -1) {
        likedMovies.splice(movieIndex, 1);
        await User.findByIdAndUpdate(
          user._id,
          { likedMovies: likedMovies },
          { new: true }
        );
      }
    }

    const movieAlreadyDisliked = DislikedMovies.find(
      ({ id }) => id === data.id
    );

    if (movieAlreadyDisliked) {
      return res.json({ message: "Movie already exist on List" });
    }

    const updateDislikedList = await User.findByIdAndUpdate(
      user._id,
      { DislikedMovies: [...user.DislikedMovies, data] },
      { new: true }
    );
    return res.status(200).json({
      message: "Movie added successfully",
      userUpdatedData: updateDislikedList,
    });
  } catch (error) {
    return res.json({ message: "Error adding movie" });
  }
}

async function removeMovieFromList(req, res) {
  try {
    const { mail, data } = req.body;


    const user = await User.findOne({ email: mail });
    if (!user) {
      return res.json({ message: "User not found" });
    }
    const { ListMovies } = user;


    if (ListMovies) {
      const movieIndex = ListMovies.findIndex(({ id }) => id === data.id);

      if (movieIndex > -1) {
        ListMovies.splice(movieIndex, 1);
        await User.findByIdAndUpdate(
          user._id,
          { ListMovies: ListMovies },
          { new: true }
        );
      }
    }


    return res.status(200).json({
      message: "Movie deleted from list successfully",
      userUpdatedData: newData,
    });
  } catch {
    return res.json({ message: "Error deleting movie from list" });
  }
}

module.exports = {
  signup,
  login,
  addToUserMoviesList,
  getUserMoviesList,
  addToLikedMovie,
  getUserLikedMoviesList,
  getUserDislikedMoviesList,
  addToDislikeList,
  removeMovieFromList,
};
