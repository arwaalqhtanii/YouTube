
import { FaUserCircle, FaBell, FaVideo, FaMicrophone, FaSearch, FaBars, FaHome, FaPlay, FaList, FaHistory, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Navbar({ handleSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); 
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const onSearch = () => {
    handleSearch(searchTerm);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="relative">

      <nav className="bg-black text-white p-4">
        <div className="container mx-auto flex items-center justify-between flex-nowrap">

          <div className="flex items-center space-x-4">
            {/*   للجوال  */}
            <FaBars className="text-2xl cursor-pointer block md:hidden" onClick={toggleSidebar} /> 
            {/*   للشاشات   */}
            <FaUserCircle className="text-2xl hidden md:block" /> 
            <FaBell className="text-2xl" />
            <FaVideo className="text-2xl" />
          </div>

      
          <div className="flex items-center bg-gray-900 rounded-full px-4 py-1 flex-grow max-w-lg">
            <FaSearch className="text-gray-400 mr-2 cursor-pointer" onClick={onSearch} />
            <input
              type="text"
              placeholder="بحث"
              className="bg-transparent text-white outline-none px-2 w-full text-right"
              value={searchTerm}
              onChange={handleInputChange}
            />
            <FaMicrophone className="text-gray-400 ml-4" />
          </div>

    
          <div className="flex items-center space-x-4">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg"
              alt="YouTube Logo"
              className="w-20"
            />
            <FaBars className="text-2xl cursor-pointer hidden md:block" onClick={toggleSidebar} /> 
          </div>
        </div>
      </nav>


      <div
        className={`fixed top-0 left-0 h-full bg-black text-white w-64 z-40 transform transition-transform duration-300 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg"
            alt="YouTube Logo"
            className="w-20 mb-4"
          />
          <ul className="space-y-4">
            <li className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/main')}>
              <FaHome />
              <span>الصفحة الرئيسية</span>
            </li>
            <li className="flex items-center space-x-2">
              <FaPlay />
              <span>Shorts</span>
            </li>
            <li className="flex items-center space-x-2">
              <FaList />
              <span>الاشتراكات</span>
            </li>
            <hr className="border-gray-700 my-4" />
            <li className="flex items-center space-x-2">
              <FaUser />
              <span>قناتك</span>
            </li>
            <li className="flex items-center space-x-2">
              <FaHistory />
              <span>السجل</span>
            </li>
            <li className="flex items-center space-x-2">
              <FaList />
              <span>قوائم التشغيل</span>
            </li>
            <li className="flex items-center space-x-2">
              <FaVideo />
              <span>فيديوهاتك</span>
            </li>
            <hr className="border-gray-700 my-4" />
            <li className="flex items-center space-x-2 cursor-pointer" onClick={handleLogout}>
              <FaSignOutAlt />
              <span>تسجيل الخروج</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
}
