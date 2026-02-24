import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
function Bears() {
  const [bears, setBears] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [values, setValues] = useState({
    name: "",
    gender: "",
    breed: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();

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
      await fetch(`${API_BASE}/bears/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setValues({
            name: data.name,
            breed: data.breed,
            gender: data.gender,
          });
        });
    } catch (error) {
      setError(error.message || "Unexpected Error");
    } finally {
      setLoading(false);
    }
  };
  const deleteBear = async () => {
    setLoading(true);
    try {
      await fetch(`${API_BASE}/bears/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((res) => res.json())
        .then((data) => {
          setBears(data);
          navigate("/dashboard", { replace: true });
        });
    } catch (error) {
      setError(error.message || "Unexpected Error");
    } finally {
      setLoading(false);
    }
  };

  const updateBear = async () => {
    try {
      await fetch(`${API_BASE}/bears/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log({ data });
        });
    } catch (error) {
      setError(error.message || "Unexpected Error");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateBear();
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
        <Link to="/dashboard">Dashboard</Link>
        <h4>View and Edit your Bear.</h4>
        <p>Name: {values && values.name}</p>
        <p>Breed: {values && values.breed}</p>
        <p>Gender: {values && values.gender}</p>
        <button onClick={deleteBear}>Delete Bear </button>
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
          <input type="submit" value="Edit Bear Info" />
        </form>
      </header>
    </div>
  );
}

export default Bears;
