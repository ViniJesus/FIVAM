import Navbar from "../components/ui/Navbar";
import { useEffect, useState } from "react";
import { api } from "../services/baseApi";
import { useNavigate } from "react-router-dom";

type Author = {
  id: string;
  name: string;
  email: string;
};

type Post = {
  id: string;
  title: string;
  content: string;
  author: Author;
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
      post.title.toLowerCase().includes(searchTerm) ||
      post.content.toLowerCase().includes(searchTerm) ||
      post.author.name.toLowerCase().includes(searchTerm)
    );
  });

  return (
    <>
      <Navbar />

      <div
        style={{
          maxWidth: "900px",
          margin: "40px auto",
          fontFamily: "Arial",
          padding: "0 20px"
        }}
      >
        <h1 style={{ marginBottom: "20px" }}>Posts do FIVAM</h1>

        {/* CAMPO DE BUSCA */}

        <input
          type="text"
          placeholder="🔎 Buscar por título, conteúdo ou autor..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "12px",
            width: "100%",
            marginBottom: "30px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "14px"
          }}
        />

        {/* LOADING */}

        {loading && (
          <p style={{ textAlign: "center" }}>⏳ Carregando posts...</p>
        )}

        {/* NENHUM RESULTADO */}

        {!loading && filteredPosts.length === 0 && (
          <p
            style={{
              textAlign: "center",
              marginTop: "40px",
              color: "#6b7280",
              fontSize: "16px"
            }}
          >
            🔍 Nenhum post encontrado para essa busca.
          </p>
        )}

        {/* LISTA DE POSTS */}

        {!loading &&
          filteredPosts.map((post) => (
            <div
              key={post.id}
              onClick={() => navigate(`/posts/${post.id}`)}
              style={{
                border: "1px solid #e5e5e5",
                borderRadius: "10px",
                padding: "20px",
                marginBottom: "20px",
                cursor: "pointer",
                transition: "0.2s",
                boxShadow: "0 2px 6px rgba(0,0,0,0.05)"
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.boxShadow =
                  "0 4px 12px rgba(0,0,0,0.1)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.boxShadow =
                  "0 2px 6px rgba(0,0,0,0.05)")
              }
            >
              <h2 style={{ marginBottom: "10px" }}>{post.title}</h2>

              <p style={{ fontSize: "14px", color: "#555" }}>
                <strong>Autor:</strong> {post.author.name}
              </p>

              <p style={{ marginTop: "10px", lineHeight: "1.5" }}>
                {post.content.length > 150
                  ? post.content.substring(0, 150) + "..."
                  : post.content}
              </p>
            </div>
          ))}
      </div>
    </>
  );
}