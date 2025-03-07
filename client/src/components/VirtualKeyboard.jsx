import eraserIcon from "@/assets/eraser.svg";
import resetIcon from "@/assets/reset.svg";
import notesIcon from "@/assets/notes.svg";

const VirtualKeyboard = ({ selectedCell, onNumberClick }) => {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div className="flex flex-col w-[85vw] ring-1 ring-amber-500 rounded-sm">
      <div className="flex justify-evenly border-b-1 border-gray-500">
        <div className="hover:bg-slate-950 active:bg-slate-950 w-full h-full">
          <div className="flex flex-col items-center">
            <img src={notesIcon} alt="Notes toggle" className="fill-sky-500" />
            <p className="text-gray-300">Notes</p>
          </div>
        </div>
        <div
          className="hover:bg-slate-950 active:bg-slate-950 w-full h-full"
          onClick={() => onNumberClick(selectedCell[0], selectedCell[1], 0)}
        >
          <div className="flex flex-col items-center gap-0">
            <img src={eraserIcon} alt="Erase cell" />
            <p className="text-gray-300">Erase</p>
          </div>
        </div>
        <div className="hover:bg-slate-950 active:bg-slate-950 w-full h-full">
          <div className="flex flex-col items-center">
            <img src={resetIcon} alt="Reset grid" />
            <p className="text-gray-300">Reset</p>
          </div>
        </div>
      </div>
      <div className="flex justify-evenly">
        {numbers.map((number, i) => {
          return (
            <div
              key={i}
              className="hover:bg-slate-950 active:bg-slate-950 w-full h-full"
              onClick={() => onNumberClick(selectedCell[0], selectedCell[1], number)}
            >
              <div className="text-sky-500 text-3xl text-center cursor-pointer">{number}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VirtualKeyboard;
