import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      <Link to="/main" className="text-blue-500 mt-4">Go Back to Home</Link>
    </div>
  );
}
