const express = require("express");
const router = express.Router();

const REPLACE_ME = // GET - /api/video-games - get all video games
  async function getAllVideoGames() {
    try {
      const { rows: videoGames } = await client.query();
      return videoGames;
    } catch (error) {
      throw new Error(
        "Make sure you have replaced the REPLACE_ME placeholder."
      );
    }
  };

const {
  getAllVideoGames,
  getVideoGameById,
  createVideoGame,
  updateVideoGame,
  deleteVideoGame,
} = require("../db/videoGames");

// GET - /api/video-games - get all video games
router.get("/", async (req, res, next) => {
  try {
    const videoGames = await getAllVideoGames();
    res.send(videoGames);
  } catch (error) {
    next(error);
  }
});

// GET - /api/video-games/:id - get a single video game by id
router.get("/:id", async (req, res, next) => {
  try {
    const videoGame = await getVideoGameById(REPLACE_ME);
    res.send(videoGame);
  } catch (error) {
    next(error);
  }
});

// POST - /api/video-games - create a new video game
router.patch("/", async (req, res, next) => {
  try {
    const videoGame = await createVideoGame();
    res.send(videoGame);
  } catch (error) {
    next(error);
  }
});

// PUT - /api/video-games/:id - update a single video game by id
router.put("/:id", async (req, res, next) => {
  try {
    const videoGame = await updateVideoGame();
    res.send(videoGame);
  } catch (error) {
    next(error);
  }
});

// DELETE - /api/video-games/:id - delete a single video game by id
router.delete("/:id", async (req, res, next) => {
  try {
    const videoGame = await deleteVideoGame(req.params.id);
    res.send(videoGame);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
