import './App.css'
import { Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import ViewStudent from './pages/ViewStudent';
import EditStudent from './pages/EditStudent';
function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/view/:id" element={<ViewStudent />} />
        <Route path="/edit/:id" element={<EditStudent />} />
      </Routes>
    </div>
  )
}

export default App
