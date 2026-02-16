import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [bears, setBears] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const API_BASE =
    process.env.NODE_ENV === "development"
      ? `http://localhost:8000`
      : process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    let ignore = false;

    if (!ignore) {
      getBears();
    }

    return () => {
      ignore = true;
    };
  }, []);

  const getBears = async () => {
    setLoading(true);
    try {
      await fetch(`${API_BASE}/bears`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setBears(data);
        });
    } catch (error) {
      setError(error.message || "Unexpected Error");
    } finally {
      setLoading(false);
    }
  };

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
