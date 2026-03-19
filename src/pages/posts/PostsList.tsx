import Navbar from "../../components/ui/Navbar";
import { useEffect, useState } from "react";
import { api } from "../../services/baseApi";
import { useNavigate } from "react-router-dom";

type Post = {
  _id: string;
  titulo: string;
  conteudo: string;
  autor: string;
};

export default function PostsList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
  }, []);

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

  const filteredPosts = posts.filter((post) => {
    const searchTerm = search.toLowerCase();

    return (
      post.titulo?.toLowerCase().includes(searchTerm) ||
      post.conteudo?.toLowerCase().includes(searchTerm) ||
      post.autor?.toLowerCase().includes(searchTerm)
    );
  });

  return (
    <>
      <Navbar />

      <div className="bg-background min-h-screen px-6 py-10">
        <div className="mx-auto max-w-3xl">
          {/* HEADER */}
          <div className="mb-8">
            <h1 className="text-text-primary text-3xl font-bold">
              Posts do FIVAM
            </h1>
            <p className="text-text-secundary mt-1 text-sm">
              Explore e busque conteúdos da comunidade
            </p>
          </div>

          {/* INPUT DE BUSCA */}
          <div className="mb-8">
            <input
              type="text"
              placeholder="🔎 Buscar por título, conteúdo ou autor..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-background-2 focus:ring-primary w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm focus:ring-2 focus:outline-none"
            />
          </div>

          {/* LOADING */}
          {loading && (
            <p className="text-text-secundary text-center">
              ⏳ Carregando posts...
            </p>
          )}

          {/* EMPTY */}
          {!loading && filteredPosts.length === 0 && (
            <p className="text-text-secundary mt-10 text-center">
              🔍 Nenhum post encontrado para essa busca.
            </p>
          )}

          {/* LISTA */}
          <div className="flex flex-col gap-4">
            {!loading &&
              filteredPosts.map((post) => (
                <div
                  key={post._id}
                  onClick={() => navigate(`/posts/${post._id}`)}
                  className="bg-background-2 cursor-pointer rounded-md border border-gray-200 p-5 shadow-sm transition-all duration-200 hover:shadow-md"
                >
                  {/* TITULO */}
                  <h2 className="text-text-primary mb-2 text-lg font-semibold">
                    {post.titulo}
                  </h2>

                  {/* AUTOR */}
                  <p className="text-text-secundary text-sm">
                    <span className="text-text-primary font-medium">
                      Autor:
                    </span>{" "}
                    {post.autor}
                  </p>

                  {/* CONTEUDO */}
                  <p className="text-text-secundary mt-3 text-sm leading-relaxed">
                    {post.conteudo.length > 150
                      ? post.conteudo.substring(0, 150) + "..."
                      : post.conteudo}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
