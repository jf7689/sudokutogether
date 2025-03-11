const SudokuCell = ({ digit, row, col, selectedCell, notes, onCellClick }) => {
  return (
    <div className="flex items-center justify-center w-8 h-8" onClick={() => onCellClick(row, col)}>
      {digit > 0 ? (
        <div
          className={`flex items-center justify-center ${
            (selectedCell[0] === row) & (selectedCell[1] === col) ? "bg-slate-700" : "bg-slate-900"
          } w-full h-full text-sky-500 text-2xl ring-1 ring-amber-500 rounded-sm`}
        >
          {digit}
        </div>
      ) : (
        <div
          className={`grid grid-cols-3 ${
            (selectedCell[0] === row) & (selectedCell[1] === col) ? "bg-slate-700" : "bg-slate-900"
          } w-full h-full ring-1 ring-amber-500 rounded-sm`}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <div
              key={num}
              className={`flex justify-center text-gray-100 text-[7px] ${!notes.includes(num) && "invisible"}`}
            >
              {num}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SudokuCell;
