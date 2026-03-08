import styles from "../../styles/components/PostCard.module.css";

interface PostCardData {
  titulo: string;
  conteudo: string;
  autor: string;
}

interface PostCardProps {
  loading: boolean;
  error: string | null;
  post: PostCardData | null;
  createdAt: string;
}

export function PostCard({ loading, error, post, createdAt }: PostCardProps) {
  return (
    <section className={styles.card}>
      {loading && <p className={styles.state}>Carregando post...</p>}

      {!loading && error && <p className={`${styles.state} ${styles.stateError}`}>{error}</p>}

      {!loading && !error && post && (
        <>
          <h1 className={styles.title}>{post.titulo}</h1>
          <p className={styles.meta}>
            {post.autor} {createdAt ? `- ${createdAt}` : ""}
          </p>
          <hr className={styles.divider} />
          <p className={styles.content}>{post.conteudo}</p>
        </>
      )}
    </section>
  );
}
