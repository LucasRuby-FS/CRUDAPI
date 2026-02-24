import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="Home">
      <header className="Home-header">
        <h1>A Bear's Home</h1>
        <h3>
          Welcome to my Bear API! If you click the Dashboard link, it will send
          you to my list of bears!
        </h3>
        <Link to="/Dashboard">Dashboard</Link>
      </header>
    </div>
  );
}

export default Home;
