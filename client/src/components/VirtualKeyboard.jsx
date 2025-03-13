const VirtualKeyboard = ({ selectedCell, notesMode, onNotesClick, onEraseClick, onResetClick, onNumberClick }) => {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div className="flex flex-col w-[85vw] ring-1 ring-amber-500 rounded-sm">
      <div className="flex justify-evenly border-b-1 border-gray-500">
        <div className="hover:bg-slate-950 active:bg-slate-950 w-full h-full cursor-pointer" onClick={onNotesClick}>
          <div className="flex flex-col items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="40px"
              viewBox="0 -960 960 960"
              width="40px"
              className={notesMode ? "fill-sky-500" : "fill-gray-300"}
            >
              <path d="M186.67-120q-27 0-46.84-19.83Q120-159.67 120-186.67v-586.66q0-27 19.83-46.84Q159.67-840 186.67-840h389L509-773.33H186.67v586.66h586.66v-324.66L840-578v391.33q0 27-19.83 46.84Q800.33-120 773.33-120H186.67ZM480-480ZM360-360v-170l377-377q10-10 22.33-14.67 12.34-4.66 24.67-4.66 12.67 0 25.04 5 12.38 5 22.63 15l74 75q9.4 9.97 14.53 22.02 5.13 12.05 5.13 24.51 0 12.47-4.83 24.97-4.83 12.5-14.83 22.5L530-360H360Zm499-424.67-74.67-74.66L859-784.67Zm-432.33 358H502l246-246L710-710l-38.33-37.33-245 244.33v76.33ZM710-710l-38.33-37.33L710-710l38 37.33L710-710Z" />
            </svg>
            <p className="text-gray-300 text-sm">Notes</p>
          </div>
        </div>
        <div
          className="hover:bg-slate-950 active:bg-slate-950 w-full h-full cursor-pointer"
          onClick={() => onEraseClick(selectedCell[0], selectedCell[1])}
        >
          <div className="flex flex-col items-center gap-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="40px"
              viewBox="0 -960 960 960"
              width="40px"
              className={`fill-gray-300`}
            >
              <path d="M682-226.67h198.67V-160H615.33L682-226.67ZM182.67-160l-82.34-84.33q-19.66-19-19.5-46.67.17-27.67 18.5-47l452-484q18.34-19.33 45.88-19.33 27.55 0 46.46 19l203 209.66q19 19 19.66 47 .67 28-18.33 47L508.67-160h-326ZM482-226.67l320.67-342-204-210.66L148-292l64 65.33h270ZM480-480Z" />
            </svg>
            <p className="text-gray-300 text-sm">Erase</p>
          </div>
        </div>
        <div className="hover:bg-slate-950 active:bg-slate-950 w-full h-full cursor-pointer" onClick={onResetClick}>
          <div className="flex flex-col items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="40px"
              viewBox="0 -960 960 960"
              width="40px"
              className={`fill-gray-300`}
            >
              <path d="M495.33-120 448-167.33 596.67-316 448-464.67 495.33-512 644-363.33 792.67-512 840-464.67 691.33-316 840-167.33 792.67-120 644-268.67 495.33-120Zm-212 0v-66.67H350V-120h-66.67Zm-96.66-653.33H120q0-27.5 19.58-47.09Q159.17-840 186.67-840v66.67Zm96.66 0V-840H350v66.67h-66.67Zm163.34 0V-840h66.66v66.67h-66.66Zm163.33 0V-840h66.67v66.67H610Zm163.33 0V-840q27.5 0 47.09 19.58Q840-800.83 840-773.33h-66.67ZM186.67-186.67V-120q-27.5 0-47.09-19.58Q120-159.17 120-186.67h66.67ZM120-283.33V-350h66.67v66.67H120Zm0-163.34v-66.66h66.67v66.66H120ZM120-610v-66.67h66.67V-610H120Zm653.33 0v-66.67H840V-610h-66.67Z" />
            </svg>
            <p className="text-gray-300 text-sm">Reset</p>
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
