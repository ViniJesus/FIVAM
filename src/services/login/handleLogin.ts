import { api } from "../baseApi";

interface LoginResponse {
  user: {
    _id: string;
    nome: string;
    email: string;
  };
  token: string;
}

export async function login(email: string, senha: string) {
  try {
    const response = await api.post<LoginResponse>("/auth/login", {
      email: email,
      senha: senha,
    });
    return response;
  } catch (error) {
    console.error(error);
  }
}
