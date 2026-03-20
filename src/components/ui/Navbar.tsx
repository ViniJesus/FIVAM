import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="bg-white/80 px-10 py-4 shadow-sm">
      {/* LOGO */}
      <div className="mx-auto flex max-w-[1200px] items-center justify-between">
        <h1
          onClick={() => navigate("/")}
          className="from-primary cursor-pointer bg-linear-to-r to-indigo-600 bg-clip-text text-3xl font-extrabold text-transparent"
        >
          FIVAM
        </h1>

        {/* BOTÕES */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate("/register")}
            className="rounded-md px-5 py-2.5 text-base font-medium text-gray-700 transition-all duration-200 hover:bg-gray-100"
          >
            Cadastro
          </button>

          <button
            onClick={() => navigate("/login")}
            className="from-primary to-accent rounded-md bg-linear-to-r px-6 py-2.5 text-base text-white shadow-md transition-all duration-200 hover:opacity-90 hover:shadow-lg"
          >
            Login
          </button>
        </div>
      </div>
    </nav>
  );
}
