import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white/80 px-4 py-4 shadow-sm backdrop-blur-md sm:px-6 md:px-10">
      <div className="mx-auto flex max-w-300 items-center justify-between">
        {/* LOGO */}
        <h1
          onClick={() => navigate("/")}
          className="from-primary cursor-pointer bg-linear-to-r to-indigo-600 bg-clip-text text-2xl font-extrabold text-transparent sm:text-3xl"
        >
          FIVAM
        </h1>

        {/* DESKTOP MENU */}
        <div className="hidden items-center gap-3 md:flex">
          <button
            onClick={() => navigate("/register")}
            className="rounded-md px-5 py-2 text-center text-sm font-medium text-gray-700 transition-all hover:bg-gray-100 sm:text-base"
          >
            Cadastro
          </button>

          <button
            onClick={() => navigate("/login")}
            className="from-primary to-accent rounded-md bg-linear-to-r px-5 py-2 text-sm text-white shadow-md transition-all hover:opacity-90 hover:shadow-lg sm:text-base"
          >
            Login
          </button>
        </div>

        {/* MOBILE BUTTON */}
        <button onClick={() => setOpen(!open)} className="md:hidden">
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="mt-4 flex flex-col gap-3 px-2 md:hidden">
          <button
            onClick={() => {
              navigate("/register");
              setOpen(false);
            }}
            className="w-full rounded-md px-4 py-2 text-center text-gray-700 hover:bg-gray-100"
          >
            Cadastro
          </button>

          <button
            onClick={() => {
              navigate("/login");
              setOpen(false);
            }}
            className="from-primary to-accent w-full rounded-md bg-linear-to-r px-4 py-2 text-white"
          >
            Login
          </button>
        </div>
      )}
    </nav>
  );
}
