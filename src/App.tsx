import { Link } from "react-router-dom";

function App() {
  return (
    <div className="p-8">
      <h1 className="mb-4 text-2xl font-bold">Lista de Posts (Em Breve)</h1>
      <Link to="/edit-post/1" className="text-blue-600 hover:underline">
        Testar Página de Edição de Postagem (ID: 1)
      </Link>
    </div>
  );
}

export default App;
