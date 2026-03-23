import Navbar from "../../components/ui/Navbar";
import { useEffect, useState } from "react";
import { api } from "../../services/baseApi";
import { useNavigate } from "react-router-dom";
import { ArrowRight, LoaderCircle, Search, SearchX } from "lucide-react";

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

export default function PostsList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  async function fetchPosts() {
    try {
      const data = await api.get<Post[]>("/posts");
      setPosts(data);
    } catch (error) {
      console.error("Erro ao buscar posts:", error);
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

  function normalize(text: string) {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  const filteredPosts = posts.filter((post) => {
    const searchTerm = normalize(debouncedSearch);

    return (
      normalize(post.titulo).includes(searchTerm) ||
      normalize(post.conteudo).includes(searchTerm) ||
      normalize(post.autor?.nome || "").includes(searchTerm)
    );
  });

  return (
    <div>
      <Navbar />

      <div className="bg-background min-h-screen px-4 py-6 sm:px-6 sm:py-10">
        <div className="mx-auto max-w-[1200px]">
          {/* HEADER */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-text-primary text-2xl font-bold sm:text-3xl">
                Postagens
              </h1>
              <p className="text-text-secundary mt-1 text-sm">
                Explore e busque conteúdos da comunidade
              </p>
            </div>

            {/* INPUT DE BUSCA */}
            <div className="relative w-full sm:w-[400px]">
              <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-400" />

              <input
                type="text"
                placeholder="Buscar por título, conteúdo ou autor..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-background-2 focus:ring-primary w-full rounded-full border border-gray-200 py-3 pr-4 pl-12 text-sm shadow-sm transition-all focus:ring-2 focus:outline-none"
              />
            </div>
          </div>

          {/* LOADING */}
          {loading && (
            <div className="flex w-full flex-col items-center justify-center py-16">
              <div className="bg-background-2 flex items-center gap-3 rounded-full border border-gray-200 px-4 py-3 shadow-sm sm:px-6">
                <LoaderCircle className="text-primary h-5 w-5 animate-spin" />
                <span className="text-text-secundary text-sm font-medium">
                  Carregando posts...
                </span>
              </div>
            </div>
          )}

          {/* EMPTY */}
          {!loading && filteredPosts.length === 0 && (
            <div className="mt-16 flex flex-col items-center justify-center px-4 text-center">
              <SearchX className="mb-3 h-8 w-8 text-gray-400" />

              <p className="text-text-secundary text-sm">
                Nenhum post encontrado para essa busca.
              </p>
            </div>
          )}

          {/* LISTA */}
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {!loading &&
              filteredPosts.map((post) => (
                <div
                  key={post._id}
                  className="bg-background-2 flex h-full flex-col rounded-2xl border border-gray-200 p-5 shadow-sm transition-all duration-200 hover:shadow-md sm:p-6"
                >
                  {/* TÍTULO */}
                  <h2 className="text-text-primary mb-2 text-lg font-semibold sm:text-xl">
                    {post.titulo}
                  </h2>

                  {/* AUTOR + DATA */}
                  <p className="text-text-secundary text-sm">
                    Por:{" "}
                    <span className="text-text-primary font-medium">
                      {post.autor.nome}
                    </span>{" "}
                    • {formatDate(post.dataCriacao)}
                  </p>

                  {/* CONTEÚDO */}
                  <p className="text-text-secundary mt-4 mb-2 line-clamp-3 text-sm leading-relaxed">
                    {post.conteudo}
                  </p>

                  {/* LINK */}
                  <button
                    onClick={() => navigate(`/posts/${post._id}`)}
                    className="text-primary mt-auto flex items-center gap-2 text-sm font-medium transition-all hover:gap-3"
                  >
                    Ler publicação
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
