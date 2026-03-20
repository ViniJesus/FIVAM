import { DeletePost } from "@/services/posts/postDelete";
import { X, AlertTriangle } from "lucide-react";
import { useState } from "react";

interface ModalProps {
  postId: string;
  onClose: () => void;
  onSuccess: () => void;
}

export default function ModalDelete({
  postId,
  onClose,
  onSuccess,
}: ModalProps) {
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    try {
      setLoading(true);
      await DeletePost(postId);
      onSuccess(); // atualiza lista
      onClose(); // fecha modal
    } catch (error) {
      console.error("Erro ao deletar", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-background-2 w-full max-w-md rounded-md border border-gray-200 p-6 shadow-lg">
        {/* HEADER */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="text-red-500" />
            <h2 className="text-text-primary font-semibold">
              Excluir postagem
            </h2>
          </div>

          <button onClick={onClose}>
            <X className="text-text-secundary hover:text-text-primary" />
          </button>
        </div>

        {/* CONTENT */}
        <p className="text-text-secundary text-sm">
          Tem certeza que deseja excluir esta postagem? Essa ação não pode ser
          desfeita.
        </p>

        {/* ACTIONS */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-md border border-gray-300 px-4 py-2 text-sm hover:bg-gray-100"
          >
            Cancelar
          </button>

          <button
            onClick={handleDelete}
            disabled={loading}
            className="flex items-center gap-2 rounded-md bg-red-500 px-4 py-2 text-sm text-white hover:bg-red-600 disabled:opacity-50"
          >
            {loading ? "Excluindo..." : "Excluir"}
          </button>
        </div>
      </div>
    </div>
  );
}
