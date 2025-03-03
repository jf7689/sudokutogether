import { Link } from "react-router";

const Home = () => {
  return (
    <div className="flex justify-center items-center flex-col h-screen bg-slate-700">
      <div className="flex flex-col items-center gap-5">
        <Link to="/create" className="flex justify-center items-center bg-amber-500 w-64 h-12 text-2xl rounded-md">Create Game</Link>
        <Link to="/lobby" className="flex justify-center items-center bg-amber-500 w-64 h-12 text-2xl rounded-md">Find Game</Link>
      </div>
    </div>
  );
}

export default Home