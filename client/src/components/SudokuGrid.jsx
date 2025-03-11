import SudokuCell from "./SudokuCell";

const SudokuGrid = ({ initialCellsMap, grid, selectedCell, notes, onCellClick }) => {
  return (
    <div className="grid grid-cols-9 gap-2 w-[95vw]">
      {grid.map((row, rowIndex) =>
        row.map((digit, colIndex) => (
          <SudokuCell
            key={`${rowIndex}-${colIndex}`}
            digit={digit}
            row={rowIndex}
            col={colIndex}
            initialCellsMap={initialCellsMap}
            selectedCell={selectedCell}
            notes={notes[rowIndex][colIndex]}
            matchingNumber={digit === grid[selectedCell[0]][selectedCell[1]]}
            onCellClick={onCellClick}
          />
        ))
      )}
    </div>
  );
};

export default SudokuGrid;
