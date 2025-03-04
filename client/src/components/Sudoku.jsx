import { useState } from "react";
import SudokuGrid from "./SudokuGrid";
import VirtualKeyboard from "./VirtualKeyboard";

const Sudoku = () => {
  const puzzle = "009000706000094203000008000006002001051000860700900500000100000105420000803000600";
  const [grid, setGrid] = useState([...puzzle].map(Number));
  const [selectedCell, setselectedCell] = useState();
  const [selectedNumber, setselectedNumber] = useState();

  return (
    <div className="flex flex-col gap-4">
      <SudokuGrid grid={grid} />
      <VirtualKeyboard />
    </div>
  );
};

export default Sudoku;
