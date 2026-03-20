import { UpdatePost } from "@/services/posts/postUpdate";
import { X, Pencil } from "lucide-react";
import { useState } from "react";

interface ModalProps {
  postId: string;
  tituloInicial: string;
  conteudoInicial: string;
  onClose: () => void;
  onSuccess: (updatedPost: any) => void;
}

export default function ModalEdit({
  postId,
  tituloInicial,
  conteudoInicial,
  onClose,
  onSuccess,
}: ModalProps) {
  const [titulo, setTitulo] = useState(tituloInicial);
  const [conteudo, setConteudo] = useState(conteudoInicial);
  const [loading, setLoading] = useState(false);

  async function handleUpdate() {
    try {
      setLoading(true);

      const updated = await UpdatePost(postId, titulo, conteudo);

      onSuccess(updated);
      onClose();
    } catch (error) {
      console.error("Erro ao atualizar post", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-background-2 w-full max-w-lg rounded-md border border-gray-200 p-6 shadow-lg">
        {/* HEADER */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Pencil className="text-primary" />
            <h2 className="text-text-primary font-semibold">Editar postagem</h2>
          </div>

          <button onClick={onClose}>
            <X className="text-text-secundary hover:text-text-primary" />
          </button>
        </div>

        {/* FORM */}
        <div className="space-y-4">
          <div>
            <label className="text-text-primary mb-1 block text-sm font-medium">
              Título
            </label>
            <input
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              className="bg-background focus:ring-primary w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-text-primary mb-1 block text-sm font-medium">
              Conteúdo
            </label>
            <textarea
              value={conteudo}
              onChange={(e) => setConteudo(e.target.value)}
              className="bg-background focus:ring-primary min-h-[150px] w-full rounded-md border border-gray-300 p-3 text-sm focus:ring-2 focus:outline-none"
            />
          </div>
        </div>

        {/* ACTIONS */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-md border border-gray-300 px-4 py-2.5 text-sm hover:bg-gray-100"
          >
            Cancelar
          </button>

          <button
            onClick={handleUpdate}
            disabled={loading}
            className="bg-primary hover:bg-hover flex items-center gap-2 rounded-md px-4 py-2.5 text-sm text-white disabled:opacity-50"
          >
            {loading ? "Salvando..." : "Salvar"}
          </button>
        </div>
      </div>
    </div>
  );
}
