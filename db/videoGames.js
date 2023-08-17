const client = require("./client");
const util = require("util");

const REPLACE_ME = `SELECT * FROM videosGames`;

// GET - /api/video-games - get all video games
async function getAllVideoGames() {
  try {
    const { rows: videoGames } = await client.query(`SELECT * FROM videoGames`);
    return videoGames;
  } catch (error) {
    throw new Error("Make sure you have replaced the REPLACE_ME placeholder.");
  }
}

// GET - /api/video-games/:id - get a single video game by id
async function getVideoGameById(id) {
  try {
    const {
      rows: [videoGame],
    } = await client.query(
      `
            SELECT * FROM videoGames
            WHERE id = $1;
        `,
      [id]
    );
    return videoGame;
  } catch (error) {
    throw error;
  }
}

// POST - /api/video-games - create a new video game
async function createVideoGame(body) {
  const { name, description, price, inStock, isPopular, imgUrl } = body;
  try {
    // Execute a query to create a new video game to the database by rows (video games) by name, description, price, inStock, isPopular, and imgUrl
    const {
      rows: [videoGame],
    } = await client.query(
      `

            INSERT INTO videogames(name, description, price, "inStock", "isPopular", "imgUrl")
            VALUES($1, $2, $3, $4, $5, $6)
            RETURNING *;
        `,
      [name, description, price, inStock, isPopular, imgUrl]
    );
    // Return the retrieved result
    return videoGame;
  } catch (error) {
    // Throw an error message
    throw error;
  }
}

// PUT - /api/video-games/:id - update a single video game by id
async function updateVideoGame(id, fields = {}) {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");
  // Check if the 'setString' is empty
  if (setString.length === 0) {
    // IF 'setString' is empty, return from the function
    return;
  }
  try {
    // Execute a query to update a video game to the database by rows (video games) by ID with 'setString'
    const {
      rows: [videoGame],
    } = await client.query(
      `
            UPDATE videogames
            SET ${setString}
            WHERE id=${id}
            RETURNING *;
        `,
      Object.values(fields)
    );
    // Return the retrieved result
    return videoGame;
  } catch (error) {
    // Throw an error message
    throw error;
  }
}

}

// DELETE - /api/video-games/:id - delete a single video game by id
async function deleteVideoGame(id) {
  try {
    // Execute a query to delete a video game to the database by rows (video games) by ID
    const {
      rows: [videoGame],
    } = await client.query(
      `
            DELETE FROM videogames
            WHERE id=$1
            RETURNING *;
        `,
      [id]
    );
    // Return the retrieved result
    return videoGame;
  } catch (error) {
    // Throw an error message
    throw error;
  }
}

module.exports = {
  getAllVideoGames,
  getVideoGameById,
  createVideoGame,
  updateVideoGame,
  deleteVideoGame,
};
