import LoginForm from "./components/LoginForm";
import { useNavigate } from "react-router-dom";

const Menu_Login = () => {
  const navigate = useNavigate();

  return (
    <div className="from-primary to-accent flex min-h-screen w-full items-center justify-center bg-linear-to-r px-4 py-6">
      <section className="bg-background w-full max-w-xl rounded-2xl px-6 py-20 shadow-xl sm:max-w-lg sm:px-6 sm:py-40 lg:max-w-xl">
        {/* HEADER */}
        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-3xl font-bold sm:text-4xl md:text-5xl">
            Bem-<span className="text-accent">Vindo</span>
          </h1>
          <p className="text-text-secundary mt-4 text-sm sm:text-base">
            Digite suas credenciais para acessar a plataforma
          </p>
        </div>

        {/* FORM */}
        <div className="mx-auto mt-8 max-w-md">
          <LoginForm />
        </div>

        {/* ESQUECI SENHA */}
        <div className="mx-auto mt-4 max-w-md text-right">
          <p className="text-primary hover:border-primary inline-block cursor-pointer border-b-2 border-transparent pb-0.5 text-sm transition-colors">
            Esqueci minha senha
          </p>
        </div>

        {/* FOOTER */}
        <div className="mx-auto mt-8 max-w-md text-center text-sm">
          <p>
            Não tem uma conta?{" "}
            <button
              onClick={() => navigate("/register")}
              className="text-primary hover:border-primary inline-block border-b-2 border-transparent pb-0.5 transition-colors"
            >
              Crie uma conta
            </button>
          </p>

          <p className="text-text-secundary mt-4 text-xs leading-relaxed sm:text-sm">
            Ao clicar em continuar, você concorda com os{" "}
            <span className="text-dark">Termos de Uso</span> e{" "}
            <span className="text-dark">Políticas de Privacidade.</span>
          </p>
        </div>
      </section>
    </div>
  );
};

export default Menu_Login;
