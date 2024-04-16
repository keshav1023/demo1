import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./components/Headers/Headers";
import Home from "./pages/Home/Home";
import { Routes, Route } from "react-router-dom"

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
