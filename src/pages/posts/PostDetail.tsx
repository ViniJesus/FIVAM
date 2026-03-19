import Navbar from "../../components/ui/Navbar";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../services/baseApi";

type Post = {
  _id: string;
  titulo: string;
  conteudo: string;
  autor: string;
};

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPost();
  }, []);

  async function fetchPost() {
    try {
      const data = await api.get<Post>(`/posts/${id}`);
      setPost(data);
    } catch (error) {
      console.error("Erro ao buscar post:", error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <p>Carregando post...</p>;
  }

  if (!post) {
    return <p>Post não encontrado.</p>;
  }

  return (
    <>
      <Navbar />

      <div
        style={{
          padding: "40px",
          fontFamily: "Arial",
          maxWidth: "800px",
          margin: "auto",
        }}
      >
        <h1>{post.titulo}</h1>

        <p>
          <strong>Autor:</strong> {post.autor}
        </p>

        <hr style={{ margin: "20px 0" }} />

        <p style={{ lineHeight: "1.6", fontSize: "18px" }}>{post.conteudo}</p>
      </div>
    </>
  );
}
