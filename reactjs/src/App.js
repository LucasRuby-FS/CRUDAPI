import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [bears, setBears] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const API_BASE =
    process.env.NODE_ENV === "development"
      ? `http://localhost:8000/api/v1`
      : process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    let ignore = false;

    const fetchBears = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE}/bears`);
        if (!res.ok) throw new Error("Failed to fetch bears");
        const data = await res.json();
        if (!ignore) setBears(data);
      } catch (err) {
        if (!ignore) setError(err.message || "Unexpected Error");
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    fetchBears();

    return () => {
      ignore = true;
    };
  }, [API_BASE]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Bears:</h1>
        <ul>
          <li>Bears</li>
        </ul>
      </header>
    </div>
  );
}

export default App;
