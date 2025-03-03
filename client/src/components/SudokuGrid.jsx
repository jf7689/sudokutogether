import { useState } from "react";
import SudokuCell from "./SudokuCell";

const SudokuGrid = () => {
    const puzzle = "009000706000094203000008000006002001051000860700900500000100000105420000803000600";
    const [grid, setGrid] = useState([...puzzle].map(Number));

  return (
    <div className="grid grid-cols-9 gap-2 w-[95vw]">
        {grid.map((digit, i) => {
            return (
            <SudokuCell key={i} digit={digit}/>
            )
        })}
    </div>
  )
}

export default SudokuGrid