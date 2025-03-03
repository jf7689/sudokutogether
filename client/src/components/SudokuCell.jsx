

const SudokuCell = ({ digit }) => {
    const cellFixed = digit !== 0;

  return (
    <div className="flex items-center justify-center w-8 h-8">
        <div className="relative w-full h-full">
            <div className="absolute -inset-1 bg-amber-300/10 rounded-sm blur"></div>
            <div className="flex items-center justify-center relative bg-slate-900 text-sky-500 text-2xl ring-1 ring-amber-500 rounded-sm">
            {cellFixed ? digit : ""}
            </div>
        </div>
    </div>
  )
}

export default SudokuCell