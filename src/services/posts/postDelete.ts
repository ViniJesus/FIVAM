import { api } from "../baseApi";

export async function DeletePost(id: string) {
  const token = localStorage.getItem("token");

  try {
    const response = await api.delete(`/posts/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
