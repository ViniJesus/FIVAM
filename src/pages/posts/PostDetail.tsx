import Navbar from "../../components/ui/Navbar";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../services/baseApi";

type Post = {
  _id: string;
  titulo: string;
  conteudo: string;
  autor: string;
  dataCriacao: string;
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

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  }

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="flex justify-center py-20">
          <p className="text-text-secundary">Carregando post...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div>
        <Navbar />
        <div className="flex justify-center py-20">
          <p className="text-text-secundary">Post não encontrado.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />

      <div className="mx-auto max-w-[1200px] px-6 py-12">
        {/* CARD */}
        <div className="bg-background-2 rounded-2xl border border-gray-200 p-8 shadow-sm">
          {/* TÍTULO */}
          <h1 className="text-text-primary text-3xl leading-tight font-bold">
            {post.titulo}
          </h1>

          {/* AUTOR + DATA */}
          <p className="text-text-secundary mt-3 text-sm">
            Por:{" "}
            <span className="text-text-primary font-medium">{post.autor}</span>{" "}
            • {formatDate(post.dataCriacao)}
          </p>

          {/* DIVIDER */}
          <div className="my-6 h-px w-full bg-gray-200" />

          {/* CONTEÚDO */}
          <p className="text-text-secundary text-base leading-relaxed whitespace-pre-line">
            {post.conteudo}
          </p>
        </div>
      </div>
    </div>
  );
}
