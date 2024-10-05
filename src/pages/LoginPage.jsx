

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (password.length < 4) {
      alert('Password must be at least 4 characters long.');
      return;
    }

    if (username && password) {
      localStorage.setItem('user', JSON.stringify({ username }));
      navigate('/main'); 
    } else {
      setError('Please enter a valid username and password');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-black text-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-8">تسجيل الدخول</h2>
        
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <input
          type="text"
          placeholder="اسم المستخدم"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 mb-4 bg-gray-700 rounded-md text-right text-white  focus:outline-none"
        />

        <input
          type="password"
          placeholder="كلمة المرور"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 bg-gray-700 rounded-md text-right text-white focus:outline-none"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white py-2  rounded-md hover:bg-blue-600 transition-colors"
        >
          تسجيل الدخول
        </button>
      </div>
    </div>
  );
}


