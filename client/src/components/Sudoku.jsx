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
  const [notesMode, setNotesMode] = useState(false);
  const [notes, setNotes] = useState([
    [[], [], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], [], []],
  ]);

  const handleCellClick = (row, col) => {
    setSelectedCell([row, col]);
  };

  const handleNotesClick = () => {
    setNotesMode(!notesMode);
  };

  const handleEraseClick = (row, col) => {
    // Exit early if cell is an inital number in the sudoku
    if (initialCellsMap[row][col] === true) {
      return;
    }

    if (grid[row][col] !== 0) {
      const newGrid = [...grid];
      // Set cell to 0 because the grid doesn't display text for a value of 0
      newGrid[row][col] = 0;
      setGrid(newGrid);
      return;
    }

    // Clear notes from the selected cell
    const newNotes = [...notes];
    newNotes[row][col] = [];
    setNotes(newNotes);
  };

  const handleResetClick = () => {
    setNotes([
      [[], [], [], [], [], [], [], [], []],
      [[], [], [], [], [], [], [], [], []],
      [[], [], [], [], [], [], [], [], []],
      [[], [], [], [], [], [], [], [], []],
      [[], [], [], [], [], [], [], [], []],
      [[], [], [], [], [], [], [], [], []],
      [[], [], [], [], [], [], [], [], []],
      [[], [], [], [], [], [], [], [], []],
      [[], [], [], [], [], [], [], [], []],
    ]);

    const newGrid = [...grid];
    newGrid.map((row, rowIndex) =>
      row.map((cell, colIndex) => {
        if (initialCellsMap[rowIndex][colIndex] === false) {
          newGrid[rowIndex][colIndex] = 0;
        }
      })
    );
    setGrid(newGrid);
  };

  // Handle number clicks for the virtual keyboard
  const handleNumberClick = (row, col, num) => {
    // Exit early if cell is an inital number in the sudoku
    if (initialCellsMap[row][col] === true) {
      return;
    }

    // Add and remove numbers from notes
    if (notesMode) {
      const newNotes = [...notes];
      if (newNotes[row][col].includes(num)) {
        newNotes[row][col] = newNotes[row][col].filter((prevNote) => prevNote !== num);
      } else {
        newNotes[row][col].push(num);
      }
      setNotes(newNotes);
      return;
    }
    const newGrid = [...grid];
    newGrid[row][col] = num;
    setGrid(newGrid);
  };

  useEffect(() => {
    // Handle keyboard controls for updating cell value and moving selectedCell (including wrapping)
    const handleKeyDown = (e) => {
      const row = selectedCell[0];
      const col = selectedCell[1];

      if (e.key >= "1" && e.key <= "9") {
        // Exit early if cell is an inital number in the sudoku
        if (initialCellsMap[row][col] === true) {
          return;
        }

        // Add and remove numbers from notes
        if (notesMode) {
          const newNotes = [...notes];
          if (newNotes[row][col].includes(Number(e.key))) {
            newNotes[row][col] = newNotes[row][col].filter((prevNote) => prevNote !== Number(e.key));
          } else {
            newNotes[row][col].push(Number(e.key));
          }
          setNotes(newNotes);
          return;
        }

        const newGrid = [...grid];
        newGrid[row][col] = Number(e.key);
        setGrid(newGrid);
      } else if (e.key === "Backspace" || e.key === "Delete") {
        // Exit early if cell is an inital number in the sudoku or if cell already is 0
        if (initialCellsMap[row][col] === true || (grid[row][col] === 0 && !notes[row][col].length)) {
          return;
        }

        if (grid[row][col] !== 0) {
          const newGrid = [...grid];
          // Set cell to 0 because the grid doesn't display text for a value of 0
          newGrid[row][col] = 0;
          setGrid(newGrid);
          return;
        }

        // Clear notes from the selected cell
        const newNotes = [...notes];
        newNotes[row][col] = [];
        setNotes(newNotes);
      } else if (e.key === "w" || e.key === "ArrowUp") {
        if (row === 0) {
          setSelectedCell([8, col]);
          return;
        }
        setSelectedCell([row - 1, col]);
      } else if (e.key === "s" || e.key === "ArrowDown") {
        if (row === 8) {
          setSelectedCell([0, col]);
          return;
        }
        setSelectedCell([row + 1, col]);
      } else if (e.key === "a" || e.key === "ArrowLeft") {
        if (col === 0) {
          setSelectedCell([row, 8]);
          return;
        }
        setSelectedCell([row, col - 1]);
      } else if (e.key === "d" || e.key === "ArrowRight") {
        if (col === 8) {
          setSelectedCell([row, 0]);
          return;
        }
        setSelectedCell([row, col + 1]);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [grid, selectedCell, notes, notesMode]);

  return (
    <div className="flex flex-col items-center gap-4">
      <SudokuGrid grid={grid} selectedCell={selectedCell} notes={notes} onCellClick={handleCellClick} />
      <VirtualKeyboard
        selectedCell={selectedCell}
        notesMode={notesMode}
        onNotesClick={handleNotesClick}
        onEraseClick={handleEraseClick}
        onResetClick={handleResetClick}
        onNumberClick={handleNumberClick}
      />
    </div>
  );
};

export default Sudoku;
