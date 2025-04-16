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
  User,
  MessageSquare,
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
      toast.error('Full name is required');
      return false;
    }
    if (!formData.email.trim()) {
      toast.error('Email is required');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error('Invalid email format');
      return false;
    }
    if (!formData.password || formData.password.length < 4) {
      toast.error('Password must be at least 4 characters');
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) signup(formData);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Side - Form */}
      <div className="flex flex-col justify-center items-center px-6 py-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <div className="flex flex-col items-center gap-2">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <MessageSquare className="size-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold">Create Account</h1>
              <p className="text-gray-500">Let's get started with iChat</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {['fullName', 'email', 'password'].map((field, index) => (
              <div key={index} className="form-control">
                <label className="label font-medium flex items-center gap-2">
                  {field === 'fullName' && (
                    <User className="size-5 text-gray-600" />
                  )}
                  {field === 'email' && (
                    <Mail className="size-5 text-gray-600" />
                  )}
                  {field === 'password' && (
                    <Lock className="size-5 text-gray-600" />
                  )}
                  <span>
                    {field === 'fullName'
                      ? 'Username'
                      : field.charAt(0).toUpperCase() + field.slice(1)}
                  </span>
                </label>
                <div className="relative">
                  <input
                    type={
                      field === 'password'
                        ? showPassword
                          ? 'text'
                          : 'password'
                        : 'text'
                    }
                    className="input input-bordered w-full"
                    placeholder={`Enter your ${field}`}
                    value={formData[field]}
                    onChange={(e) =>
                      setFormData({ ...formData, [field]: e.target.value })
                    }
                  />
                  {field === 'password' && (
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center pr-3"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="size-5 text-gray-600" />
                      ) : (
                        <Eye className="size-5 text-gray-600" />
                      )}
                    </button>
                  )}
                </div>
              </div>
            ))}

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isSigninUp}
            >
              {isSigninUp ? (
                <Loader2 className="size-5 animate-spin" />
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          <p className="text-center text-gray-500">
            Already have an account?{' '}
            <Link to="/login" className="text-primary font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side - Chat Preview and iChat Info */}
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

export default Signup;
