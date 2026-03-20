import Navbar from "../../components/ui/Navbar";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../../services/baseApi";
import { ArrowLeft } from "lucide-react";

type Autor = {
  _id: string;
  nome: string;
  email: string;
};

type Post = {
  _id: string;
  titulo: string;
  conteudo: string;
  autor: Autor;
  dataCriacao: string;
};

export default function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

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
    <div className="bg-background min-h-screen">
      <Navbar />

      <div className="mx-auto max-w-[1200px] px-6 py-12">
        {/* BOTÃO VOLTAR */}
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="hover:bg-hover bg-primary flex items-center gap-2 rounded-md px-3 py-2.5 text-white transition-all"
          >
            <ArrowLeft size={18} />
            Voltar
          </button>
        </div>

        {/* CARD */}
        <div className="bg-background-2 rounded-md border border-gray-200 p-8 shadow-sm">
          {/* TÍTULO */}
          <h1 className="text-text-primary text-3xl leading-tight font-bold">
            {post.titulo}
          </h1>

          {/* AUTOR + DATA */}
          <p className="text-text-secundary mt-3 text-sm">
            Por:{" "}
            <span className="text-text-primary font-medium">
              {post.autor.nome}
            </span>{" "}
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
