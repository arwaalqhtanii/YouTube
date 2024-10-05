
// import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
// import MainPage from './pages/MainPage';
// import LoginPage from './pages/LoginPage';
// import Navbar from './components/Navbar';
// import { useState } from 'react';

// function Layout({ children, handleSearch }) {
//   const location = useLocation();
//   return (
//     <>

//       {location.pathname !== '/' && <Navbar handleSearch={handleSearch} />}
//       {children}
//     </>
//   );
// }

// export default function AppRouter() {
//   const [searchTerm, setSearchTerm] = useState('');

//   const handleSearch = (term) => {
//     setSearchTerm(term);
//   };

//   return (
//     <Router>
//       <Layout handleSearch={handleSearch}>
//         <Routes>
//           <Route path="/" element={<LoginPage />} />
//           <Route path="/main" element={<MainPage searchTerm={searchTerm} />} />
//         </Routes>
//       </Layout>
//     </Router>
//   );
// }




import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/Register';
import Navbar from './components/Navbar';
import { useState } from 'react';

function Layout({ children, handleSearch }) {
  const location = useLocation();
sh
  return (
    <>
      {location.pathname !== '/' && location.pathname !== '/register' && (
        <Navbar handleSearch={handleSearch} />
      )}
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
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/main" element={<MainPage searchTerm={searchTerm} />} />
        </Routes>
      </Layout>
    </Router>
  );
}
