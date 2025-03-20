import supabase from "../config/supabaseClient.js";

const getPuzzle = async (req, res) => {
  const { difficulty } = req.query;

  try {
    // Select the matching view to get puzzle from
    let view = "puzzle_easy";

    if (difficulty === "medium") {
      view = "puzzle_medium";
    } else if (difficulty === "hard") {
      view = "puzzle_hard";
    } else if (difficulty === "extreme") {
      view = "puzzle_extreme";
    }

    // Query database and return the puzzle
    const { data, error } = await supabase.from(view).select("puzzle").limit(1).single();

    if (error) throw error;

    return res.status(200).json({
      status: 200,
      data: data,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      status: 400,
      error: "Failed to retrieve a sudoku puzzle",
    });
  }
};

export default { getPuzzle };
