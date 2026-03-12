import Input from "@/components/input/Input";
import { register } from "@/services/register/handleRegister";
import { LoaderCircle } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!nome || !email || !senha) {
      alert("Preencha todas as informações");
      return;
    }

    try {
      setLoading(true);

      const response = await register(nome, email, senha);

      if (!response) {
        throw new Error("Erro ao criar usuário");
      }

      navigate("/login");
    } catch (error) {
      console.error("Erro ao registrar:", error);
      alert("Erro ao criar conta");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleRegister} className="mt-4 flex flex-col gap-3">
      <Input value={nome} setValue={setNome} type="text" label="Nome" />

      <Input value={email} setValue={setEmail} type="email" label="Email" />

      <Input value={senha} setValue={setSenha} type="password" label="Senha" />

      <button
        type="submit"
        disabled={loading}
        className="bg-primary disabled:bg-accent hover:bg-hover mt-10 w-full rounded-md px-4 py-2.5 text-white transition-all duration-300 disabled:opacity-70"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <LoaderCircle className="animate-spin" />
            Criando Conta...
          </span>
        ) : (
          <span>Criar Conta</span>
        )}
      </button>
    </form>
  );
};

export default RegisterForm;
