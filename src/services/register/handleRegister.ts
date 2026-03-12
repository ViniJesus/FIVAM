import { api } from "../baseApi";

interface LoginResponse {
  user: {
    _id: string;
    nome: string;
    email: string;
    role: string;
  };
}

export async function register(nome: string, email: string, senha: string) {
  try {
    const response = await api.post<LoginResponse>("/auth/register", {
      nome: nome,
      email: email,
      senha: senha,
      role: "professor",
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
}
