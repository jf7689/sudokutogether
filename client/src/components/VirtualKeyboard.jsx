const VirtualKeyboard = () => {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div className="flex justify-evenly w-[95vw] ring-1 ring-amber-500 rounded-sm">
      {numbers.map((number, i) => {
        return (
          <div key={i} className="hover:bg-slate-950 active:bg-slate-950 w-full h-full">
            <div className="text-sky-500 text-2xl text-center cursor-pointer">{number}</div>
          </div>
        );
      })}
    </div>
  );
};

export default VirtualKeyboard;
