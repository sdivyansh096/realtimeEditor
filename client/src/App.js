import "./App.css";
import Home from "./component/Home";
import EditorPage from "./component/EditorPage";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/editor/:roomId" element={<EditorPage />} />
      </Routes>
    </div>
  );
}

export default App;
