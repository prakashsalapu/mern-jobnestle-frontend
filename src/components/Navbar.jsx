import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Briefcase, Menu, X, LogOut, User } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // helper to read token
    const readToken = async () => {
      const token = localStorage.getItem('token');
      if (!token) return setUser(null);
      try {
        const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const res = await fetch(`${API_BASE}/api/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) {
          setUser(null);
          return;
        }
        const body = await res.json();
        setUser({ email: body.user.email, fullName: body.user.fullName });
      } catch (e) {
        setUser(null);
      }
    };

    // call it initially
    readToken();

    // update on storage events (other tabs), custom auth events, and on location changes
    const onStorage = (e) => {
      if (e.key === 'token') readToken();
    };
    const onAuthChanged = () => readToken();
    window.addEventListener('storage', onStorage);
    window.addEventListener('authChanged', onAuthChanged);

    // re-read token when route changes (login may navigate)
    readToken();

    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('authChanged', onAuthChanged);
    };
  }, [location.pathname]);

  const handleLogout = async () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Briefcase className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">JobNestle</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">
              Home
            </Link>
            <Link to="/jobs" className="text-gray-700 hover:text-blue-600 transition-colors">
              Jobs
            </Link>

            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700 flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>Hi, {user.email?.split('@')[0]}</span>
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-blue-600 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-3">
              <Link
                to="/"
                className="text-gray-700 hover:text-blue-600 transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/jobs"
                className="text-gray-700 hover:text-blue-600 transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                Jobs
              </Link>

              {user ? (
                <>
                  <span className="text-gray-700 py-2">Hi, {user.email?.split('@')[0]}</span>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors text-left"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-gray-700 hover:text-blue-600 transition-colors py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-center"
                    onClick={() => setIsOpen(false)}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
