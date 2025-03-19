import { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import {
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  MessageSquare,
  User,
} from 'lucide-react';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  });
  const { signup, isSigninUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      toast.error('Full name is required', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        icon: <User className="text-error" />,
      });
      return false;
    }

    if (!formData.email.trim()) {
      toast.error('Email is required', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        icon: <Mail className="text-error" />,
      });
      return false;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error('Invalid email format', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        icon: <Mail className="text-error" />,
      });
      return false;
    }

    if (!formData.password) {
      toast.error('Password is required', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        icon: <Lock className="text-error" />,
      });
      return false;
    }

    if (formData.password.length < 4) {
      toast.error('Password must be at least 4 characters', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        icon: <Lock className="text-error" />,
      });
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();

    if (success === true) signup(formData);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* LOGO */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div
                className="size-12 rounded-xl bg-primary/10 flex items-center justify-center 
              group-hover:bg-primary/20 transition-colors"
              >
                <MessageSquare className="size-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Create Account</h1>
              <p className="text-base-content/60">
                Let's get started with Chatify
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Username</span>{' '}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="size-5 text-base-content/40" />
                </div>
                <input
                  type="text"
                  className={`input input-bordered w-full pl-10`}
                  placeholder="Enter your username"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="size-5 text-base-content/40" />
                </div>
                <input
                  type="email"
                  className={`input input-bordered w-full pl-10`}
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="size-5 text-base-content/40" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className={`input input-bordered w-full pl-10`}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="size-5 text-base-content/40" />
                  ) : (
                    <Eye className="size-5 text-base-content/40" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isSigninUp}
            >
              {isSigninUp ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Loading...
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-base-content/60">
              Already have an account?{' '}
              <Link to="/login" className="link link-primary">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="hidden lg:flex bg-primary/5 flex-col justify-center items-center p-8">
        <div className="max-w-md mx-auto text-center space-y-8">
          {/* Illustration or App Preview */}
          <div className="bg-base-100 rounded-2xl shadow-xl p-4 max-w-sm mx-auto">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <MessageSquare className="size-5 text-primary" />
                </div>
                <div className="font-medium">Chatify</div>
              </div>

              {/* Sample chat bubbles */}
              <div className="flex flex-col space-y-3">
                <div className="chat chat-start">
                  <div className="chat-bubble bg-base-200">
                    Hi there! How are you today?
                  </div>
                </div>
                <div className="chat chat-end">
                  <div className="chat-bubble bg-primary text-primary-content">
                    I'm doing great! Just checking out this new chat app.
                  </div>
                </div>
                <div className="chat chat-start">
                  <div className="chat-bubble bg-base-200">
                    It's awesome, right? So easy to use and beautifully
                    designed!
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature highlights */}
          <div className="space-y-6 mt-8">
            <h2 className="text-2xl font-bold">Why Choose Chatify?</h2>

            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-start space-x-3">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <User className="size-5 text-primary" />
                </div>
                <div className="text-left">
                  <h3 className="font-medium">User-Friendly Experience</h3>
                  <p className="text-sm text-base-content/70">
                    Intuitive interface designed for smooth conversations
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <Lock className="size-5 text-primary" />
                </div>
                <div className="text-left">
                  <h3 className="font-medium">Secure Messaging</h3>
                  <p className="text-sm text-base-content/70">
                    End-to-end encryption keeps your chats private
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <div className="size-5 text-primary flex items-center justify-center font-bold">
                    ⚡
                  </div>
                </div>
                <div className="text-left">
                  <h3 className="font-medium">Lightning Fast</h3>
                  <p className="text-sm text-base-content/70">
                    Instant message delivery and syncing across devices
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
