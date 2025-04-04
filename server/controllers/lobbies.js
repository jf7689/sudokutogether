import supabase from "../config/supabaseClient.js";

const getLobby = async (req, res) => {
  const { name } = req.query;

  try {
    let query = supabase.from("lobbies").select();

    // Apply filter if provided
    if (name) {
      query = query.eq("name", name).single();
    }

    // Query database and return lobby data
    const { data, error } = await query;

    if (error) throw error;

    return res.status(200).json({
      status: 200,
      data: data,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: 500,
      error: "Failed to retrieve a lobby data",
    });
  }
};

const createLobby = async (req, res) => {
  const { name, difficulty, gameMode, visibility } = req.body;

  try {
    // Insert new lobby to database
    const { error } = await supabase.from("lobbies").insert({ name, difficulty, gameMode, visibility });

    if (error) throw error;

    return res.status(201).json({
      status: 201,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: 500,
      error: "Failed to create a lobby",
    });
  }
};

export default { getLobby, createLobby };
