import { useState } from 'react';
import { Link } from 'react-router-dom';
import { UserCircleIcon, UserIcon, LogoutIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../../hooks/useAuth';

export const Header = () => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const { logout, user } = useAuth();

  return (
    <header className="bg-gray-800 shadow-lg ">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-white ">
              <span className="text-teal-400 font-light ">Fin</span><span className="cursive">zarc</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            
            {/* <Link to="/tasks" className="text-gray-300 hover:text-teal-400 transition-colors">
              manage tasks
            </Link> */}
            
            {/* Profile Menu */}
            <div className="relative">
              <button
                className="flex items-center space-x-2 text-gray-300 hover:text-teal-400 transition-colors"
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              >
                <UserIcon className="h-6 w-6 text-teal-400 "/>
              </button>
              
              {/* Profile Dropdown */}
              {isProfileMenuOpen && (
                <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-32 rounded-lg bg-gray-800 py-2 shadow-xl border border-gray-700">
                  <div className="px-4 py-2 border-b border-gray-700 text-center">
                    <p className="text-sm text-white">{user?.name}</p>
                    <p className="text-xs text-gray-400">{user?.email}</p>
                  </div>
                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:text-teal-400 hover:bg-gray-700 transition-colors"
                  >
                    Logout
                  </button> 
                </div>
              )}
            </div>
            
          </div>
        </div>
      </nav>
    </header>
  );
};