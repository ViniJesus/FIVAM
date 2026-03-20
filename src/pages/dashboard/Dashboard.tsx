import NavbarLogin from "@/components/ui/NavBarLogin";
import { postsService, type Post } from "@/services/posts/postsService";
import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ModalDelete from "../posts/modal/ModalDelete";
import ModalEdit from "../posts/modal/ModalEdit";

const Dashboard = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const user = localStorage.getItem("nome");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    async function getPosts() {
      try {
        const data = await postsService();
        setPosts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    getPosts();
  }, []);

  // 🔥 filtro CORRETO agora (por ID)
  const filteredPosts = posts.filter((post) => post.autor?._id === userId);

  return (
    <div className="bg-background min-h-screen">
      <NavbarLogin user={user} />

      <div className="mx-auto max-w-4xl px-6 py-10">
        {/* HEADER */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-text-primary text-2xl font-bold">
              Painel do Professor
            </h1>
            <p className="text-text-secundary mt-1 text-sm">
              Gerencie suas publicações
            </p>
          </div>

          <button
            onClick={() => navigate("/posts/create")}
            className="bg-primary hover:bg-hover flex items-center gap-2 rounded-md px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-all"
          >
            <Plus size={16} />
            Nova Publicação
          </button>
        </div>

        {/* LOADING */}
        {loading && (
          <p className="text-text-secundary text-center">Carregando posts...</p>
        )}

        {/* LISTA */}
        {!loading && filteredPosts.length > 0 && (
          <div className="flex flex-col gap-4">
            {filteredPosts.map((post) => (
              <div
                key={post._id}
                className="bg-background-2 flex items-center justify-between rounded-md border border-gray-200 p-5 shadow-sm transition-all hover:shadow-md"
              >
                {/* INFO */}
                <div>
                  <h2 className="text-text-primary font-semibold">
                    {post.titulo}
                  </h2>

                  <p className="text-text-secundary mt-1 text-sm">
                    Autor: {post.autor?.nome}
                  </p>
                </div>

                {/* AÇÕES */}
                <div className="flex items-center gap-2">
                  {/* EDITAR */}
                  <button
                    onClick={() => {
                      setSelectedPost(post);
                      setEditModal(true);
                    }}
                    className="flex items-center gap-1 rounded-md border border-gray-300 px-3 py-1.5 text-sm transition-all hover:bg-gray-100"
                  >
                    <Pencil size={14} />
                    Editar
                  </button>

                  {/* EXCLUIR */}
                  <button
                    onClick={() => {
                      setSelectedPost(post);
                      setModal(true);
                    }}
                    className="flex items-center gap-1 rounded-md border border-red-200 px-3 py-1.5 text-sm text-red-500 transition-all hover:bg-red-50"
                  >
                    <Trash2 size={14} />
                    Excluir
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* EMPTY */}
        {!loading && filteredPosts.length === 0 && (
          <div className="mt-16 text-center">
            <p className="text-text-secundary mb-4">
              Você ainda não criou nenhuma publicação.
            </p>

            <button
              onClick={() => navigate("/posts/create")}
              className="bg-primary hover:bg-hover rounded-md px-4 py-2.5 text-sm text-white"
            >
              Criar primeiro post
            </button>
          </div>
        )}
      </div>
      {modal && selectedPost && (
        <ModalDelete
          postId={selectedPost._id}
          onClose={() => setModal(false)}
          onSuccess={() => {
            setPosts((prev) => prev.filter((p) => p._id !== selectedPost._id));
          }}
        />
      )}

      {editModal && selectedPost && (
        <ModalEdit
          postId={selectedPost._id}
          tituloInicial={selectedPost.titulo}
          conteudoInicial={selectedPost.conteudo}
          onClose={() => setEditModal(false)}
          onSuccess={(updated) => {
            setPosts((prev) =>
              prev.map((p) =>
                p._id === updated._id
                  ? { ...p, ...updated } // 👈 merge seguro
                  : p,
              ),
            );
          }}
        />
      )}
    </div>
  );
};

export default Dashboard;
