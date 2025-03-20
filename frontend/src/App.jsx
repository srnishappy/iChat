import { Routes, Route, Navigate } from 'react-router-dom'; // ไม่ต้องนำเข้า BrowserRouter ที่นี่
import Navbar from './components/Navbar';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import Home from './pages/Home';
import { useAuthStore } from './store/useAuthStore';
import { useEffect } from 'react';
import { Loader } from 'lucide-react';
import { ToastContainer } from 'react-toastify'; // นำเข้า ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // นำเข้า style ของ react-toastify

const App = () => {
  const { authUser, checkAuth, isCheckAuth, onlineUsers } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log(onlineUsers);

  if (isCheckAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );

  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={authUser ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/signup"
          element={!authUser ? <Signup /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!authUser ? <Login /> : <Navigate to="/" />}
        />
        <Route path="/settings" element={<Settings />} />
        <Route
          path="/profile"
          element={authUser ? <Profile /> : <Navigate to="/login" />}
        />
      </Routes>

      <ToastContainer />
    </div>
  );
};

export default App;
