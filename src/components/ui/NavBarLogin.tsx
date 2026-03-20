import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { LogOut } from "lucide-react";

interface User {
  user: string | null;
}

export default function NavbarLogin({ user }: User) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("nome");
    localStorage.removeItem("username");
    localStorage.removeItem("userId");
    navigate("/");
  }

  // fechar ao clicar fora
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
    <nav className="bg-background-2 border-b border-gray-200 px-10 py-4 shadow-sm">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between">
        {/* LOGO */}
        <h1
          onClick={() => navigate("/")}
          className="from-primary cursor-pointer bg-linear-to-r to-indigo-600 bg-clip-text text-3xl font-extrabold text-transparent"
        >
          FIVAM
        </h1>

        {/* USER MENU */}
        <div className="relative" ref={dropdownRef}>
          {/* BOTÃO */}
          <button
            onClick={() => setOpen(!open)}
            className="bg-primary hover:bg-hover flex h-10 w-10 items-center justify-center rounded-md font-semibold text-white transition-all"
          >
            {initial}
          </button>

          {/* DROPDOWN */}
          {open && (
            <div className="bg-background-2 animate-in fade-in zoom-in-95 absolute right-0 mt-3 w-56 rounded-md border border-gray-200 p-4 shadow-md">
              {/* USER INFO */}
              <div className="mb-3">
                <p className="text-text-secundary text-sm">Logado como:</p>
                <p className="text-text-primary truncate font-semibold">
                  {user}
                </p>
              </div>

              <div className="my-3 border-t border-gray-200" />

              {/* LOGOUT */}
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-red-500 transition-all hover:bg-red-50"
              >
                <LogOut size={16} />
                Sair
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
