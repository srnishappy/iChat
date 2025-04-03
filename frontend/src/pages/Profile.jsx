import { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { Camera, Mail, User, Check, Loader2 } from 'lucide-react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { axiosInstance } from '../lib/axios';
const Profile = () => {
  const { authUser, isUpdateProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);
  const [newFullName, setNewFullName] = useState(authUser?.fullname || '');
  const [isUpdating, setIsUpdating] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);

      // อัปเดตรูปโปรไฟล์ใน store
      await updateProfile({ profilePic: base64Image });
    };
  };

  const handleChangeUsername = async () => {
    if (!newFullName.trim()) {
      toast.error('Please enter a valid name.');
      return;
    }

    setIsUpdating(true);
    try {
      // ส่งคำขอ API สำหรับการอัปเดตชื่อ
      const res = await axiosInstance.put('/auth/change-username', {
        fullName: newFullName.trim(),
      });

      if (res.status === 200) {
        toast.success('Username updated successfully!');

        // อัปเดตชื่อผู้ใช้ใน store ด้วย
        updateProfile({ fullname: newFullName.trim() });
      } else {
        toast.error(res.data.message || 'Failed to update username.');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error(error.response?.data?.msg || 'Something went wrong.');
    } finally {
      setIsUpdating(false);
    }
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

          {/* Avatar Upload */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={selectedImg || authUser.profilePic || '/avatar.png'}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-white dark:border-gray-700 shadow-md"
              />
              <label
                htmlFor="avatar-upload"
                className={`absolute bottom-0 right-0 bg-blue-500 hover:bg-blue-600 p-2 rounded-full cursor-pointer transition-all duration-200 shadow-lg ${
                  isUpdateProfile ? 'animate-pulse pointer-events-none' : ''
                }`}
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

          {/* Change Username */}
          <div className="space-y-1.5">
            <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
              <User className="w-4 h-4" />
              Username
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                className="px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 font-medium w-full"
                value={newFullName}
                onChange={(e) => setNewFullName(e.target.value)}
                disabled={isUpdating}
              />
              <button
                className="bg-zinc-800 text-white px-4 py-2 rounded-lg flex items-center gap-2 
            hover:bg-zinc-700 dark:bg-zinc-700 dark:hover:bg-zinc-600 
            transition-all duration-200 disabled:opacity-50"
                onClick={handleChangeUsername}
                disabled={isUpdating}
              >
                {isUpdating ? (
                  <Loader2 className="animate-spin w-5 h-5" />
                ) : (
                  <Check className="w-5 h-5" />
                )}
                Confirm
              </button>
            </div>
          </div>

          {/* Email Display */}
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
      </div>
    </div>
  );
};

export default Profile;
