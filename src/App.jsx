import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SuperAdmin from './pages/SuperAdmin';
import LoginPage from './pages/Auth/LoginPage';
import NotFound from './components/NotFound';
import Admin from './pages/Admin';

function App() {
  return (
    <>
      <Router>
        <main>
          <Routes>
            <Route exact path="/" element={
              <LoginPage />
            } />
            <Route exact path="/super-admin/*" element={
              <SuperAdmin />
            } />

            <Route exact path="/company/:id/*" element={
              <Admin />
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

      </Router>
    </>
  )
}

export default App
