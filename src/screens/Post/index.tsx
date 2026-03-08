import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { PostCard, PostTopbar } from "../../components/post";
import { api } from "../../lib/api";
import styles from "./Post.module.css";

interface Post {
  _id: string;
  titulo: string;
  conteudo: string;
  autor: string;
  dataCriacao: string;
}

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(date);
}

export function PostScreen() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const postId = id?.trim();

    if (!postId) {
      setPost(null);
      setError("ID do post nao informado na URL.");
      setLoading(false);
      return;
    }

    const controller = new AbortController();

    async function loadPost() {
      try {
        setLoading(true);
        setError(null);
        const data = await api.get<Post>(`/posts/${postId}`, {
          signal: controller.signal,
        });
        setPost(data);
      } catch (err) {
        if (controller.signal.aborted) return;
        const message =
          err instanceof Error ? err.message : "Erro ao carregar o post.";
        setError(message);
        setPost(null);
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    void loadPost();

    return () => {
      controller.abort();
    };
  }, [id]);

  const createdAt = useMemo(() => {
    if (!post?.dataCriacao) return "";
    return formatDate(post.dataCriacao);
  }, [post?.dataCriacao]);

  return (
    <main className={styles.page}>
      <PostTopbar />
      <PostCard loading={loading} error={error} post={post} createdAt={createdAt} />
    </main>
  );
}
