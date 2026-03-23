import RegisterForm from "./components/RegisterForm";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  return (
    <div className="from-primary to-accent flex min-h-screen w-full items-center justify-center bg-linear-to-r px-4 py-6">
      <section className="bg-background w-full max-w-md rounded-2xl px-6 py-20 shadow-xl sm:max-w-lg sm:px-10 sm:py-40 lg:max-w-xl">
        {/* HEADER */}
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold sm:text-4xl md:text-5xl">
            Crie uma <span className="text-accent">conta</span>
          </h1>
          <p className="text-text-secundary mt-3 text-sm sm:text-base">
            Preencha os dados para começar
          </p>
        </div>

        {/* FORM */}
        <div className="mx-auto max-w-md">
          <RegisterForm />
        </div>

        {/* FOOTER */}
        <div className="mx-auto mt-8 max-w-md text-center text-sm">
          <p>
            Já possui uma conta?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-primary hover:border-primary inline-block border-b-2 border-transparent pb-0.5 transition-colors"
            >
              Fazer Login
            </button>
          </p>
        </div>
      </section>
    </div>
  );
};

export default Register;
