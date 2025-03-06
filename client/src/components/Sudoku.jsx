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
    // Handle keyboard controls for updating cell value and moving selectedCell (including wrapping)
    const handleKeyDown = (e) => {
      if (e.key >= "1" && e.key <= "9") {
        // Exit early if cell is an inital number in the sudoku
        if (initialCellsMap[selectedCell[0]][selectedCell[1]] === true) {
          return;
        }
        const newGrid = [...grid];
        newGrid[selectedCell[0]][selectedCell[1]] = Number(e.key);
        setGrid(newGrid);
      } else if (e.key === "Backspace" || e.key === "Delete") {
        // Exit early if cell is an inital number in the sudoku or if cell already is 0
        if (
          initialCellsMap[selectedCell[0]][selectedCell[1]] === true ||
          grid[selectedCell[0]][selectedCell[1]] === 0
        ) {
          return;
        }
        const newGrid = [...grid];
        // Set cell to 0 because the grid doesn't display text for a value of 0
        newGrid[selectedCell[0]][selectedCell[1]] = 0;
        setGrid(newGrid);
      } else if (e.key === "w" || e.key === "ArrowUp") {
        if (selectedCell[0] === 0) {
          setSelectedCell([8, selectedCell[1]]);
          return;
        }
        setSelectedCell([selectedCell[0] - 1, selectedCell[1]]);
      } else if (e.key === "s" || e.key === "ArrowDown") {
        if (selectedCell[0] === 8) {
          setSelectedCell([0, selectedCell[1]]);
          return;
        }
        setSelectedCell([selectedCell[0] + 1, selectedCell[1]]);
      } else if (e.key === "a" || e.key === "ArrowLeft") {
        if (selectedCell[1] === 0) {
          setSelectedCell([selectedCell[0], 8]);
          return;
        }
        setSelectedCell([selectedCell[0], selectedCell[1] - 1]);
      } else if (e.key === "d" || e.key === "ArrowRight") {
        if (selectedCell[1] === 8) {
          setSelectedCell([selectedCell[0], 0]);
          return;
        }
        setSelectedCell([selectedCell[0], selectedCell[1] + 1]);
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
