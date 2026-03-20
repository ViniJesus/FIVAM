import { api } from "../baseApi";

export async function CreatePost(titulo: string, conteudo: string) {
  try {
    const response = await api.post("/posts", {
      titulo,
      conteudo,
    });

    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
