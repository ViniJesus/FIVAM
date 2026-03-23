import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { LogOut } from "lucide-react";

export default function Nav_Bar() {
  const navigate = useNavigate();

  // 🔐 estado de autenticação
  const [user, setUser] = useState<string | null>(null);

  // dropdown
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 🔥 pega dados do localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    const nome = localStorage.getItem("nome");

    if (token && nome) {
      setUser(nome);
    }
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("nome");
    localStorage.removeItem("username");
    localStorage.removeItem("userId");

    setUser(null); // 🔥 atualiza na hora
    navigate("/");
  }

  // fechar dropdown ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const initial = user ? user.charAt(0).toUpperCase() : "U";

  return (
    <nav className="bg-white/80 px-10 py-4 shadow-sm">
      <div className="mx-auto flex max-w-300 items-center justify-between">
        {/* LOGO */}
        <h1
          onClick={() => navigate("/")}
          className="from-primary cursor-pointer bg-linear-to-r to-indigo-600 bg-clip-text text-3xl font-extrabold text-transparent"
        >
          FIVAM
        </h1>

        {/* 🔥 CONDIÇÃO PRINCIPAL */}
        {!user ? (
          // 👤 NÃO LOGADO
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate("/register")}
              className="rounded-md px-5 py-2.5 text-base font-medium text-gray-700 hover:bg-gray-100"
            >
              Cadastro
            </button>

            <button
              onClick={() => navigate("/login")}
              className="from-primary to-accent rounded-md bg-linear-to-r px-6 py-2.5 text-base text-white shadow-md hover:opacity-90"
            >
              Login
            </button>
          </div>
        ) : (
          // 🔐 LOGADO
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setOpen(!open)}
              className="bg-primary flex h-10 w-10 items-center justify-center rounded-md font-semibold text-white"
            >
              {initial}
            </button>

            {open && (
              <div className="absolute right-0 mt-3 w-56 rounded-md border bg-white p-4 shadow-md">
                <div className="mb-3">
                  <p className="text-sm text-gray-500">Logado como:</p>
                  <p className="truncate font-semibold">{user}</p>
                </div>

                <div className="my-3 border-t" />

                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-red-500 hover:bg-red-50"
                >
                  <LogOut size={16} />
                  Sair
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
