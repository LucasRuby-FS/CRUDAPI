import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Bear from "./pages/Bear";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Bear/:id" element={<Bear />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
