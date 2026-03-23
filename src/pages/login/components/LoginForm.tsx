import Input from "@/components/input/Input";
import { login } from "@/services/login/handleLogin";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !senha) {
      setError("Preencha email e senha");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await login(email, senha);

      if (!response) {
        throw new Error("Token não recebido");
      }

      localStorage.setItem("token", response.token);
      localStorage.setItem("nome", response.user.nome);
      localStorage.setItem("username", response.user.email);
      localStorage.setItem("userId", response.user._id);

      navigate("/dashboard");
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      setError("Email ou senha inválidos");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="mt-6 flex flex-col gap-4">
      {/* INPUTS */}
      <div className="flex flex-col gap-3">
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
        className="bg-primary hover:bg-hover disabled:bg-accent mt-2 flex w-full items-center justify-center gap-2 rounded-md px-4 py-3 text-sm font-medium text-white transition-all duration-300"
      >
        {loading ? (
          <>
            <LoaderCircle className="h-4 w-4 animate-spin" />
            Entrando...
          </>
        ) : (
          "Continuar"
        )}
      </button>
    </form>
  );
};

export default LoginForm;
