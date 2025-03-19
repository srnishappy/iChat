import { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { Camera, Mail, User, Calendar } from 'lucide-react';

const Profile = () => {
  const { authUser, isUpdateProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pt-20 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-8 space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
              Profile
            </h1>
            <p className="mt-2 text-gray-500 dark:text-gray-400">
              Manage your personal information
            </p>
          </div>

          {/* Avatar upload section */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={selectedImg || authUser.profilePic || '/avatar.png'}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-white dark:border-gray-700 shadow-md"
              />
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-0 right-0 
                  bg-blue-500 hover:bg-blue-600 hover:scale-105
                  p-2 rounded-full cursor-pointer 
                  transition-all duration-200 shadow-lg
                  ${isUpdateProfile ? 'animate-pulse pointer-events-none' : ''}
                `}
              >
                <Camera className="w-5 h-5 text-white" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdateProfile}
                />
              </label>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {isUpdateProfile
                ? 'Uploading...'
                : 'Click the camera icon to update your photo'}
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
                <User className="w-4 h-4" />
                Username
              </div>
              <p className="px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 font-medium">
                {authUser?.fullname}
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email
              </div>
              <p className="px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 font-medium">
                {authUser?.email}
              </p>
            </div>
          </div>

          <div className="mt-6 bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
            <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
              Account Details
            </h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-600">
                <span className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <Calendar className="w-4 h-4" />
                  Joined
                </span>
                <span className="text-gray-800 dark:text-white font-medium">
                  {authUser.createdAt?.split('T')[0]}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
