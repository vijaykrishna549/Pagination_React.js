import AnimeCharacters from "./components/AnimeCharacters";
import "./App.css";
import Fibonacci from "./task2/Fibonacci";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <h4>Kalkani Code Test </h4>
      {/* <AnimeCharacters /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AnimeCharacters />}></Route>
          <Route path="/fibonacci" element={<Fibonacci />}></Route>
        </Routes>
      </BrowserRouter>

      {/* <Fs /> */}
    </div>
  );
}

export default App;
