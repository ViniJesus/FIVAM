import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <nav
      style={{
        background: "#2f63d8",
        padding: "14px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        color: "white",
        fontFamily: "Arial"
      }}
    >
      {/* LOGO */}

      <h2
        style={{
          margin: 0,
          fontSize: "18px",
          fontWeight: "bold",
          letterSpacing: "0.5px"
        }}
      >
        FIVAM Blog
      </h2>

      {/* BOTÕES */}

      <div
        style={{
          display: "flex",
          gap: "12px"
        }}
      >
        <button
          onClick={() => navigate("/")}
          style={{
            padding: "8px 16px",
            borderRadius: "20px",
            border: "none",
            background: "white",
            color: "#2f63d8",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "0.2s"
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.opacity = "0.8")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.opacity = "1")
          }
        >
          📄 Posts
        </button>

        <button
          onClick={handleLogout}
          style={{
            padding: "8px 16px",
            borderRadius: "20px",
            border: "none",
            background: "#ff4d4f",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "0.2s"
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.opacity = "0.8")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.opacity = "1")
          }
        >
          🚪 Logout
        </button>
      </div>
    </nav>
  );
}