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
      ? `http://localhost:8000/api/v1`
      : process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    fetchBears();
  }, []);

  const fetchBears = async () => {
    setLoading(true);
    try {
      await fetch(`${API_BASE}/bears`)
        .then((res) => res.json())
        .then((data) => {
          console.log("Fetched Bears:", data, Array.isArray(data));
          setBears(Array.isArray(data) ? data : []);
        });
    } catch (error) {
      setError(error.message || "Unexpected Error");
    } finally {
      setLoading(false);
    }
  };

  const createBear = async () => {
    try {
      await fetch(`${API_BASE}/bears`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }).then(() => fetchBears());
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
        <h1>Bears:</h1>
        <Link to="/">Home</Link>
        <ul>
          {bears?.map((bear) => (
            <li key={bear._id}>
              <Link to={`/bears/${bear._id}`}>{bear.name}</Link>
            </li>
          ))}
        </ul>
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
          <input type="submit" value="Submit" />
        </form>
      </header>
    </div>
  );
}

export default Dashboard;
