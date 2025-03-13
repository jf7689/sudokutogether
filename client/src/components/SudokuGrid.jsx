import SudokuCell from "./SudokuCell";

const SudokuGrid = ({ initialCellsMap, grid, selectedCell, notes, onCellClick }) => {
  return (
    <div className="grid grid-cols-9 justify-items-center gap-2 max-w-[600px] max-h-[600px]">
      {grid.map((row, rowIndex) =>
        row.map((digit, colIndex) => (
          <SudokuCell
            key={`${rowIndex}-${colIndex}`}
            digit={digit}
            row={rowIndex}
            col={colIndex}
            initialCell={initialCellsMap[rowIndex][colIndex]}
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
