import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function Dashboard() {
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
    <div className="Dashboard">
      <header className="Dashboard-header">
        <h1>Bears:</h1>
        <Link to="/">Home</Link>
        <ul>
          {bears &&
            bears.map((bear) => (
              <li key={bear._id}>
                <Link to={`/bears/${bear._id}`}>{bear.name}</Link>
              </li>
            ))}
        </ul>
      </header>
    </div>
  );
}

export default Dashboard;
//All red lines throughout this page.
//Routes do not work.
//React Router errors.
//I cannot figure out how to connect the reactjs and api. The localhost only goes to 3000, and I need to use 8000.
//Build has made problems, I think to the routing and trying to use REST on VSCode to stimulate the requests.
//I am not confident on the package.jsons being made correctly. As well as the server.js and App.js.
//The localhost:8000 can only be accepted by adding /api/v1/bears example:
//localhost:8000/api/v1/bears
