import SudokuCell from "./SudokuCell";

const SudokuGrid = ({ grid, selectedCell, notesMode, onCellClick }) => {
  return (
    <div className="grid grid-cols-9 gap-2 w-[95vw]">
      {grid.map((row, rowIndex) =>
        row.map((digit, colIndex) => (
          <SudokuCell
            key={`${rowIndex}-${colIndex}`}
            digit={digit}
            row={rowIndex}
            col={colIndex}
            selectedCell={selectedCell}
            notesMode={notesMode}
            onCellClick={onCellClick}
          />
        ))
      )}
    </div>
  );
};

export default SudokuGrid;
