

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (password.length < 4) {
      setError('Password must be at least 4 characters long.');
      return;
    }

    if (username && password) {
      try {

        const response = await fetch(`https://66e7e6bbb17821a9d9da704c.mockapi.io/home?search=${username}`);
        const data = await response.json();

        if (data.length === 0) {
          setError('Account does not exist. Please register.');
          return;
        }

        
        const user = data.find((user) => user.username === username);
        if (user && user.password === password) {
          localStorage.setItem('user', JSON.stringify({ username }));
          navigate('/main');
        } else {
          setError('Invalid password. Please try again.');
        }
      } catch (err) {
        setError('Failed to login. Please try again.');
      }
    } else {
      setError('Please enter a valid username and password.');
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
          className="w-full p-3 mb-4 bg-gray-700 rounded-md text-right text-white focus:outline-none"
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
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          تسجيل الدخول
        </button>

        <p className="text-center mt-4">
          ليس لديك حساب؟{' '}
          <span
            onClick={() => navigate('/register')}
            className="text-blue-500 cursor-pointer hover:underline"
          >
            سجل الآن
          </span>
        </p>
      </div>
    </div>
  );
}
