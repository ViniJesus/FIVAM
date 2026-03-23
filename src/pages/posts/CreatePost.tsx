import { ArrowLeft, Send } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CreatePost } from "@/services/posts/postCreate";
import NavbarLogin from "@/components/ui/NavBarLogin";

export default function CreatePostPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    titulo: "",
    conteudo: "",
  });

  const [loading, setLoading] = useState(false);

  const user = localStorage.getItem("nome");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();

    try {
      setLoading(true);
      await CreatePost(formData.titulo, formData.conteudo);
      navigate("/dashboard");
    } catch (error) {
      console.error("Erro ao criar post", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background min-h-screen">
      <NavbarLogin user={user} />

      <main className="mx-auto max-w-3xl px-4 py-6 sm:px-6 sm:py-10">
        {/* TOPO */}
        <div className="mb-6 flex items-start gap-3 sm:mb-8 sm:items-center sm:gap-4">
          <Link
            to="/"
            className="text-text-secundary hover:text-text-primary mt-1 transition sm:mt-0"
          >
            <ArrowLeft />
          </Link>

          <div>
            <h1 className="text-text-primary text-xl font-semibold sm:text-2xl">
              Criar nova publicação
            </h1>
            <p className="text-text-secundary text-sm">
              Compartilhe conhecimento com seus alunos
            </p>
          </div>
        </div>

        {/* CARD */}
        <form
          onSubmit={handleSubmit}
          className="bg-background-2 space-y-5 rounded-xl border border-gray-200 p-4 shadow-sm sm:space-y-6 sm:p-6"
        >
          {/* TÍTULO */}
          <div>
            <label className="text-text-primary mb-2 block text-sm font-medium">
              Título
            </label>
            <input
              type="text"
              name="titulo"
              value={formData.titulo}
              onChange={handleChange}
              placeholder="Ex: Introdução ao React"
              className="bg-background focus:ring-primary w-full rounded-md border border-gray-300 px-4 py-3 text-sm focus:ring-2 focus:outline-none"
              required
            />
          </div>

          {/* CONTEÚDO */}
          <div>
            <label className="text-text-primary mb-2 block text-sm font-medium">
              Conteúdo
            </label>
            <textarea
              name="conteudo"
              value={formData.conteudo}
              onChange={handleChange}
              placeholder="Escreva o conteúdo do post..."
              className="bg-background focus:ring-primary min-h-[200px] w-full rounded-md border border-gray-300 p-4 text-sm leading-relaxed focus:ring-2 focus:outline-none sm:min-h-[250px] md:min-h-[300px]"
              required
            />
          </div>

          {/* FOOTER */}
          <div className="flex flex-col items-stretch justify-end gap-3 border-t border-gray-100 pt-4 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="w-full rounded-md px-5 py-2.5 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-gray-100 sm:w-auto sm:text-base"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={loading}
              className="from-primary to-accent flex w-full items-center justify-center gap-2 rounded-md bg-linear-to-r px-6 py-2.5 text-sm text-white shadow-md transition-all duration-200 hover:opacity-90 hover:shadow-lg disabled:opacity-70 sm:w-auto sm:text-base"
            >
              <Send size={16} />
              {loading ? "Publicando..." : "Publicar"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
