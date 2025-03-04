const SudokuCell = ({ digit }) => {
  const cellFixed = digit !== 0;

  return (
    <div className="flex items-center justify-center w-8 h-8">
      <div className="flex items-center justify-center bg-slate-900 w-full h-full text-sky-500 text-2xl ring-1 ring-amber-500 rounded-sm">
        {cellFixed && digit}
      </div>
    </div>
  );
};

export default SudokuCell;
