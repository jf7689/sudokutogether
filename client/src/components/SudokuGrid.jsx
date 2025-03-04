import SudokuCell from "./SudokuCell";

const SudokuGrid = ({ grid }) => {
  return (
    <div className="grid grid-cols-9 gap-2 w-[95vw]">
      {grid.map((digit, i) => {
        return <SudokuCell key={i} digit={digit} />;
      })}
    </div>
  );
};

export default SudokuGrid;
