import { useEffect, useState } from "react";
import SudokuGrid from "./SudokuGrid";
import VirtualKeyboard from "./VirtualKeyboard";

const initialGrid = [
  [0, 0, 9, 0, 0, 0, 7, 0, 6],
  [0, 0, 0, 0, 9, 4, 2, 0, 3],
  [0, 0, 0, 0, 0, 8, 0, 0, 0],
  [0, 0, 6, 0, 0, 2, 0, 0, 1],
  [0, 5, 1, 0, 0, 0, 8, 6, 0],
  [7, 0, 0, 9, 0, 0, 5, 0, 0],
  [0, 0, 0, 1, 0, 0, 0, 0, 0],
  [1, 0, 5, 4, 2, 0, 0, 0, 0],
  [8, 0, 3, 0, 0, 0, 6, 0, 0],
];

const initialCellsMap = initialGrid.map((row) => row.map((cell) => cell !== 0));

const Sudoku = () => {
  const [grid, setGrid] = useState(initialGrid);
  const [selectedCell, setSelectedCell] = useState([0, 0]);

  const handleCellClick = (row, col) => {
    setSelectedCell([row, col]);
  };

  const handleNumberClick = (row, col, num) => {
    if (initialCellsMap[selectedCell[0]][selectedCell[1]] === true) {
      return;
    }
    const newGrid = [...grid];
    newGrid[row][col] = num;
    setGrid(newGrid);
  };

  useEffect(() => {
    if (initialCellsMap[selectedCell[0]][selectedCell[1]] === true) {
      return;
    }
    const handleKeyDown = (e) => {
      if (e.key >= "1" && e.key <= "9") {
        const newGrid = [...grid];
        newGrid[selectedCell[0]][selectedCell[1]] = Number(e.key);
        setGrid(newGrid);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [grid, selectedCell]);

  return (
    <div className="flex flex-col items-center gap-4">
      <SudokuGrid grid={grid} selectedCell={selectedCell} onCellClick={handleCellClick} />
      <VirtualKeyboard selectedCell={selectedCell} onNumberClick={handleNumberClick} />
    </div>
  );
};

export default Sudoku;
