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

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !senha) {
      alert("Preencha email e senha");
    }

    try {
      setLoading(true);
      const response = await login(email, senha);

      if (!response) {
        throw new Error("Token não recebido");
      }

      localStorage.setItem("token", response.token);
      localStorage.setItem("nome", response.user.nome);
      localStorage.setItem("username", response.user.email);

      navigate("/posts");
      setLoading(false);
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      alert("Email ou senha inválidos");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="mt-4 flex flex-col gap-3">
      <Input value={email} setValue={setEmail} type="email" label="Email" />
      <Input value={senha} setValue={setSenha} type="password" label="Senha" />
      <button
        type="submit"
        disabled={loading}
        className="bg-primary disabled:bg-accent hover:bg-hover mt-4 w-full rounded-md px-4 py-2.5 text-white transition-all duration-300"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <LoaderCircle className="animate-spin" />
            Entrando...
          </span>
        ) : (
          <span>Continuar</span>
        )}
      </button>
    </form>
  );
};

export default LoginForm;
