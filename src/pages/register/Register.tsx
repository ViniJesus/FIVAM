import RegisterForm from "./components/RegisterForm";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  return (
    <div className="from-primary to-accent flex min-h-screen w-full flex-col items-center justify-center bg-linear-to-r bg-cover bg-center p-4 md:flex-row md:p-0">
      <section className="bg-background min-w-xl rounded-lg px-10 py-40 shadow-md">
        <div className="mb-4 text-center">
          <h1 className="text-4xl font-bold">
            Crie uma <span className="text-accent">conta</span>
          </h1>
        </div>
        <RegisterForm />
        <div className="mt-6 text-center text-sm">
          <p>
            Já possui uma conta?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-primary hover:border-primary mt-4 inline-block border-b-2 border-transparent pb-0.5 text-sm transition-colors"
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
