const SudokuCell = ({ digit, row, col, selectedCell, onCellClick }) => {
  return (
    <div className="flex items-center justify-center w-8 h-8" onClick={() => onCellClick(row, col)}>
      <div
        className={`flex items-center justify-center ${
          (selectedCell[0] === row) & (selectedCell[1] === col) ? "bg-slate-700" : "bg-slate-900"
        } w-full h-full text-sky-500 text-2xl ring-1 ring-amber-500 rounded-sm`}
      >
        {digit > 0 && digit}
      </div>
    </div>
  );
};

export default SudokuCell;
