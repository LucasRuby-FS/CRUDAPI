import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function Dashboard() {
  const [bears, setBears] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [values, setValues] = useState({
    name: "",
    gender: "",
    breed: "",
  });
  const API_BASE =
    process.env.NODE_ENV === "development"
      ? `http://localhost:8000`
      : process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    fetchBears();
  }, []);

  const fetchBears = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/bears`);
      if (!res.ok) {
        throw new Error(`HTTP error! state: ${res.status}`);
      }
      const data = await res.json();
      console.log("Fetched bears:", data, Array.isArray(data));
      setBears(Array.isArray(data) ? data : []);
    } catch (error) {
      setError(error.message || "Unexpected Error");
    } finally {
      setLoading(false);
    }
  };

  const createBear = async () => {
    setLoading(true);
    try {
      await fetch(`${API_BASE}/bears`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      await fetchBears();
    } catch (error) {
      setError(error.message || "Unexpected Error");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createBear();
  };

  const handleInputChanges = (event) => {
    event.persist();
    setValues((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
  };
  return (
    <div className="App">
      <header className="App-header">
        <Link to="/">Home</Link>
        <h1>Bear List:</h1>
        <p>Click on the Bears name to edit or delete the Bear.</p>
        <ul>
          {bears?.map((bear) => (
            <li key={bear._id}>
              <Link to={`/bears/${bear._id}`}>{bear.name}</Link>
            </li>
          ))}
        </ul>
        <p>Add Information for a new Bear:</p>
        <form onSubmit={(event) => handleSubmit(event)}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={values.name}
              onChange={handleInputChanges}
            />
          </label>
          <label>
            Breed:
            <input
              type="text"
              name="breed"
              value={values.breed}
              onChange={handleInputChanges}
            />
          </label>
          <label>
            Gender:
            <input
              type="text"
              name="gender"
              value={values.gender}
              onChange={handleInputChanges}
            />
          </label>
          <input type="submit" value="Add Bear" />
        </form>
      </header>
    </div>
  );
}

export default Dashboard;
