import supabase from "../config/supabaseClient";

const getPuzzle = async (req, res) => {
  try {
    return res.status(200).json({
      status: 200,
      data: [],
    });
  } catch (err) {
    return res.status(400).json({
      status: 400,
      error: "Failed to retrieve a sudoku puzzle",
    });
  }
};

export default { getPuzzle };
