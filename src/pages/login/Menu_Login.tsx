import React from "react";
import LoginForm from "./components/LoginForm";

const Menu_Login = () => {
  return (
    <div className="from-primary to-accent flex min-h-screen w-full flex-col items-center justify-center bg-linear-to-r bg-cover bg-center p-4 md:flex-row md:p-0">
      <section className="bg-background rounded-lg px-10 py-40 shadow-md">
        <div className="">
          <h1 className="text-center text-4xl font-bold">
            Bem-<span className="text-accent">Vindo</span>
          </h1>
          <p className="text-text-secundary mt-4">
            Digite suas credenciais para acessar a plataforma
          </p>
        </div>
        <LoginForm />
        <div>
          <button className="bg-primary hover:bg-hover mt-10 w-full rounded-md px-4 py-2.5 text-white transition-all duration-300">
            Continuar
          </button>
          <p className="text-primary hover:border-primary mt-4 inline-block border-b-2 border-transparent pb-0.5 text-sm transition-colors">
            Esqueci minha senha
          </p>
        </div>
        <div className="mt-6 text-center text-sm">
          <p>
            Não tem uma conta?{" "}
            <span className="text-primary hover:border-primary mt-4 inline-block border-b-2 border-transparent pb-0.5 text-sm transition-colors">
              Crie uma conta
            </span>
          </p>
          <p className="text-text-secundary mt-4 max-w-sm">
            Ao clicar em continuar, você concorda com os{" "}
            <span className="text-dark">Termos de Uso</span> e{" "}
            <span className="text-dark">Políticas de Privacidade</span>
          </p>
        </div>
      </section>
    </div>
  );
};

export default Menu_Login;
