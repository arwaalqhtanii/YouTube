
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import Navbar from './components/Navbar';
import { useState } from 'react';

function Layout({ children, handleSearch }) {
  const location = useLocation();
  return (
    <>

      {location.pathname !== '/' && <Navbar handleSearch={handleSearch} />}
      {children}
    </>
  );
}

export default function AppRouter() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <Router>
      <Layout handleSearch={handleSearch}>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/main" element={<MainPage searchTerm={searchTerm} />} />
        </Routes>
      </Layout>
    </Router>
  );
}

