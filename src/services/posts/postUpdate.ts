// services/posts/updatePost.ts

import { api } from "../baseApi";

export async function UpdatePost(id: string, titulo: string, conteudo: string) {
  try {
    const response = await api.put(`/posts/${id}`, {
      titulo,
      conteudo,
    });

    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
