import { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
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

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { login, isLogin } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="h-screen grid lg:grid-cols-2">
      {/* Left Side - Form */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <MessageSquare className="w-6 h-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Welcome to iChat </h1>
              <p className="text-base-content/60">Login and let's chat!</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label className="label flex items-center gap-2">
                <Mail className="h-5 w-5 text-base-content/40" />
                <span className="label-text font-medium">Email</span>
              </label>
              <input
                type="email"
                className="input input-bordered w-full"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            <div className="form-control">
              <label className="label flex items-center gap-2">
                <Lock className="h-5 w-5 text-base-content/40" />
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="input input-bordered w-full"
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
                    <EyeOff className="h-5 w-5 text-base-content/40" />
                  ) : (
                    <Eye className="h-5 w-5 text-base-content/40" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isLogin}
            >
              {isLogin ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Loading...
                </>
              ) : (
                'Sign in'
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-base-content/60">
              Don&apos;t have an account?{' '}
              <Link to="/signup" className="link link-primary">
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Image/Pattern/iChat App Info */}
      <div className="hidden lg:flex bg-primary/5 flex-col justify-center items-center p-8">
        <div className="max-w-md mx-auto text-center space-y-8">
          {/* Chat Preview */}
          <div className="bg-base-100 rounded-2xl shadow-xl p-4 max-w-sm mx-auto">
            <div className="flex flex-col space-y-4">
              {/* User's Chat */}
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <img
                    src="https://th.bing.com/th/id/R.6b0022312d41080436c52da571d5c697?rik=CWihwAiT6S2emg&pid=ImgRaw&r=0"
                    alt="User"
                    className="w-10 h-10 rounded-full"
                  />
                </div>
                <div className="font-medium">srnishappy</div>
              </div>

              {/* Chat bubbles */}
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
                    It's awesome, right? So easy to use and very well designed!
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature Highlights */}
          <div className="space-y-6 mt-8">
            <h2 className="text-2xl font-bold">Why Choose iChat?</h2>
            <div className="grid grid-cols-1 gap-4">
              {[
                {
                  title: 'User-Friendly Experience',
                  icon: <User className="size-5 text-primary" />,
                },
                {
                  title: 'Secure Messaging',
                  icon: <Lock className="size-5 text-primary" />,
                },
                {
                  title: 'Lightning Fast',
                  icon: <div className="size-5 text-primary">⚡</div>,
                },
              ].map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    {feature.icon}
                  </div>
                  <div className="text-left">
                    <h3 className="font-medium">{feature.title}</h3>
                    <p className="text-sm text-gray-500">
                      {feature.title === 'User-Friendly Experience'
                        ? 'Intuitive interface designed for smooth conversations.'
                        : feature.title === 'Secure Messaging'
                        ? 'End-to-end encryption keeps your chats private.'
                        : 'Instant message delivery and syncing across devices.'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
