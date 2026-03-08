import { ArrowLeft, Save } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

export default function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    titulo: "",
    conteudo: "",
    autor: "",
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulando o carregamento dos dados atuais do post
    setTimeout(() => {
      setFormData({
        titulo: "The Future of Asynchronous Learning",
        conteudo:
          "O aprendizado assíncrono está emergindo como um modelo eficaz...",
        autor: "Dr. Jane Smith",
      });
      setIsLoading(false);
    }, 600);
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simular o comportamento de salvar as alterações
    console.log("Saving data:", formData);
    navigate("/");
  };

  if (isLoading) {
    return (
      <div className="bg-background font-poppins flex min-h-screen items-center justify-center">
        <div className="text-text-secundary animate-pulse font-medium">
          Loading post data...
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background font-poppins selection:bg-accent/30 flex min-h-screen flex-col">
      {/* Header */}
      <header className="bg-background-2 border-dark/5 sticky top-0 z-50 w-full border-b shadow-sm">
        <div className="mx-auto flex h-20 max-w-4xl items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="hover:bg-background text-text-secundary hover:text-text-primary rounded-full p-2 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-text-primary text-xl font-bold tracking-tight">
              Edição de Postagem
            </h1>
          </div>

          <button
            onClick={handleSubmit}
            className="bg-primary hover:bg-primary/90 shadow-primary/20 hover:shadow-primary/30 flex items-center gap-2 rounded-full px-6 py-2.5 font-medium text-white shadow-sm transition-all hover:shadow-md"
          >
            <Save className="h-4 w-4" />
            <span>Salvar Alterações</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto w-full max-w-4xl flex-1 px-6 py-12">
        <form onSubmit={handleSubmit} className="space-y-8 tracking-wide">
          {/* Main info card */}
          <div className="bg-background-2 border-dark/5 shadow-dark/5 rounded-3xl border p-8 shadow-sm">
            <div className="space-y-6">
              {/* Título */}
              <div>
                <label
                  htmlFor="titulo"
                  className="text-text-primary mb-2 block text-sm font-semibold"
                >
                  Título
                </label>
                <input
                  type="text"
                  id="titulo"
                  name="titulo"
                  value={formData.titulo}
                  onChange={handleChange}
                  className="bg-background border-dark/10 text-text-primary placeholder:text-text-secundary focus:ring-primary/20 focus:border-primary w-full rounded-2xl border px-5 py-3.5 text-lg font-medium transition-all focus:ring-2 focus:outline-none"
                  placeholder="Insira o título da postagem..."
                  required
                />
              </div>

              {/* Autor */}
              <div>
                <label
                  htmlFor="autor"
                  className="text-text-primary mb-2 block text-sm font-semibold"
                >
                  Autor(a)
                </label>
                <input
                  type="text"
                  id="autor"
                  name="autor"
                  value={formData.autor}
                  onChange={handleChange}
                  className="bg-background border-dark/10 text-text-primary placeholder:text-text-secundary focus:ring-primary/20 focus:border-primary w-full rounded-2xl border px-5 py-3.5 transition-all focus:ring-2 focus:outline-none"
                  placeholder="Nome do autor(a)..."
                  required
                />
              </div>
            </div>
          </div>

          {/* Editor Card */}
          <div className="bg-background-2 border-dark/5 shadow-dark/5 mt-8 flex min-h-[400px] flex-1 flex-col rounded-3xl border p-8 shadow-sm">
            <label
              htmlFor="conteudo"
              className="text-text-primary mb-2 block text-sm font-semibold"
            >
              Conteúdo do Post
            </label>
            <textarea
              id="conteudo"
              name="conteudo"
              value={formData.conteudo}
              onChange={handleChange}
              className="bg-background border-dark/10 text-text-primary placeholder:text-text-secundary focus:ring-primary/20 focus:border-primary min-h-[300px] w-full flex-1 resize-none rounded-2xl border p-5 font-mono text-sm leading-relaxed transition-all focus:ring-2 focus:outline-none"
              placeholder="Comece a editar o conteúdo do seu post aqui..."
              required
            />
          </div>
        </form>
      </main>
    </div>
  );
}
