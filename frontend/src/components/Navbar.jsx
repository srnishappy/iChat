import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { LogOut, MessageSquare, User } from 'lucide-react';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  const [hoverButton, setHoverButton] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed w-full top-0 z-40 backdrop-blur-lg bg-base-100 bg-opacity-90
      transition-all duration-300 ${
        isScrolled ? 'shadow-md' : 'shadow-sm'
      } border-b border-base-300`}
    >
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="group flex items-center gap-2.5 transition-all duration-300"
            >
              <div className="size-9 rounded-lg bg-primary/20 flex items-center justify-center shadow-md transform group-hover:rotate-3 group-hover:scale-110 transition-all duration-300">
                <MessageSquare className="w-5 h-5 text-primary group-hover:animate-pulse" />
              </div>
              <h1 className="text-lg font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                iChat
              </h1>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            {authUser && (
              <>
                <div className="flex items-center mr-1">
                  <div className="size-8 rounded-full overflow-hidden border-2 border-base-100 shadow-sm">
                    <img
                      src={authUser.profilePic || '/avatar.png'}
                      alt={authUser.fullname}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="ml-2 font-medium text-base-content hidden md:block">
                    {authUser.fullname}
                  </span>
                </div>

                <Link
                  to="/profile"
                  className="relative overflow-hidden btn btn-sm rounded-lg bg-base-200/50 border border-base-300 hover:border-primary/40 shadow-sm hover:shadow transition-all duration-300 flex items-center gap-2"
                  onMouseEnter={() => setHoverButton('profile')}
                  onMouseLeave={() => setHoverButton(null)}
                >
                  <div
                    className={`absolute inset-0 bg-primary/10 transform ${
                      hoverButton === 'profile' ? 'scale-100' : 'scale-0'
                    } rounded-lg transition-transform duration-300 ease-out`}
                  ></div>
                  <User
                    className={`w-4 h-4 transition-all duration-300 ${
                      hoverButton === 'profile' ? 'text-primary' : ''
                    }`}
                  />
                  <span className="hidden sm:inline font-medium z-10">
                    Profile
                  </span>
                </Link>

                <button
                  onClick={logout}
                  className="relative overflow-hidden btn btn-sm rounded-lg bg-base-200/50 border border-base-300 hover:border-error/40 shadow-sm hover:shadow transition-all duration-300 flex items-center gap-2"
                  aria-label="Logout"
                  onMouseEnter={() => setHoverButton('logout')}
                  onMouseLeave={() => setHoverButton(null)}
                >
                  <div
                    className={`absolute inset-0 bg-error/10 transform ${
                      hoverButton === 'logout' ? 'scale-100' : 'scale-0'
                    } rounded-lg transition-transform duration-300 ease-out`}
                  ></div>
                  <LogOut
                    className={`w-4 h-4 transition-all duration-300 ${
                      hoverButton === 'logout' ? 'text-error' : ''
                    }`}
                  />
                  <span className="hidden sm:inline font-medium z-10">
                    Logout
                  </span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
