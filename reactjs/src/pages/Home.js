import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="Home">
      <header className="Home-header">
        <h1>Bears List beats</h1>
        <Link to="/Dashboard">Dashboard</Link>
      </header>
    </div>
  );
}

export default Home;
