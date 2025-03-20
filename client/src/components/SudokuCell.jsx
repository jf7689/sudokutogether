const SudokuCell = ({ digit, row, col, initialCell, selectedCell, notes, matchingNumber, onCellClick }) => {
  return (
    <div className="flex items-center justify-center w-8 md:w-12 h-8 md:h-12" onClick={() => onCellClick(row, col)}>
      {digit > 0 ? (
        <div
          className={`flex items-center justify-center w-full h-full ${
            matchingNumber ? "text-sky-300" : initialCell ? "text-gray-300" : "text-sky-500"
          } text-2xl md:text-3xl ${matchingNumber && "font-bold"} ring-1 ${
            selectedCell[0] === row || selectedCell[1] === col ? "ring-amber-500" : "ring-amber-900"
          } rounded-sm select-none`}
        >
          {digit}
        </div>
      ) : (
        <div
          className={`grid grid-cols-3 w-full h-full ring-1 ${
            selectedCell[0] === row || selectedCell[1] === col ? "ring-amber-500" : "ring-amber-900"
          } rounded-sm`}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <div
              key={num}
              className={`flex justify-center text-gray-100 md:text-gray-300 text-[7px] md:text-[10px] select-none ${
                !notes.includes(num) && "invisible"
              }`}
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
