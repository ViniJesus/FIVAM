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
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!nome || !email || !senha) {
      setError("Preencha todas as informações");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await register(nome, email, senha);

      if (!response) {
        throw new Error("Erro ao criar usuário");
      }

      navigate("/login");
    } catch (error) {
      console.error("Erro ao registrar:", error);
      setError("Erro ao criar conta. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleRegister} className="mt-6 flex flex-col gap-4">
      {/* INPUTS */}
      <div className="flex flex-col gap-3">
        <Input value={nome} setValue={setNome} type="text" label="Nome" />

        <Input value={email} setValue={setEmail} type="email" label="Email" />

        <Input
          value={senha}
          setValue={setSenha}
          type="password"
          label="Senha"
        />
      </div>

      {/* ERRO */}
      {error && <p className="text-center text-sm text-red-500">{error}</p>}

      {/* BOTÃO */}
      <button
        type="submit"
        disabled={loading}
        className="bg-primary hover:bg-hover disabled:bg-accent mt-2 flex w-full items-center justify-center gap-2 rounded-md px-4 py-3 text-sm font-medium text-white transition-all duration-300 disabled:opacity-70"
      >
        {loading ? (
          <>
            <LoaderCircle className="h-4 w-4 animate-spin" />
            Criando conta...
          </>
        ) : (
          "Criar Conta"
        )}
      </button>
    </form>
  );
};

export default RegisterForm;
