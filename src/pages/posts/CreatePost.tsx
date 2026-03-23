import { ArrowLeft, Send } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CreatePost } from "@/services/posts/postCreate";
import Nav_Bar from "@/components/ui/Nav_Bar";

export default function CreatePostPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    titulo: "",
    conteudo: "",
  });

  const [loading, setLoading] = useState(false);

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
      <Nav_Bar />

      <main className="mx-auto max-w-3xl px-6 py-10">
        {/* TOPO */}
        <div className="mb-8 flex items-center gap-4">
          <Link
            to="/"
            className="text-text-secundary hover:text-text-primary transition"
          >
            <ArrowLeft />
          </Link>

          <div>
            <h1 className="text-text-primary text-2xl font-semibold">
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
          className="bg-background-2 space-y-6 rounded-md border border-gray-200 p-6 shadow-sm"
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
              className="bg-background focus:ring-primary min-h-[250px] w-full rounded-md border border-gray-300 p-4 text-sm leading-relaxed focus:ring-2 focus:outline-none"
              required
            />
          </div>

          {/* FOOTER */}
          <div className="flex items-center justify-end gap-3 border-t border-gray-100 pt-4">
            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="rounded-md px-5 py-2.5 text-base font-medium text-gray-700 transition-all duration-200 hover:bg-gray-100"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={loading}
              className="from-primary to-accent flex items-center gap-2 rounded-md bg-linear-to-r px-6 py-2.5 text-base text-white shadow-md transition-all duration-200 hover:opacity-90 hover:shadow-lg"
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
