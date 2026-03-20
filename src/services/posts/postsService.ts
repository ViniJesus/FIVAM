import { api } from "../baseApi";

export type Post = {
  _id: string;
  titulo: string;
  conteudo: string;
  autor: {
    _id: string;
    nome: string;
  };
};

export async function postsService() {
  try {
    const response = await api.get<Post[]>("/posts");
    return response;
  } catch (error) {
    console.error(error);
    return [];
  }
}
