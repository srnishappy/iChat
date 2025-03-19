import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import { toast } from 'react-toastify';
import { CheckCircle } from 'react-toastify';
export const useAuthStore = create((set) => ({
  authUser: null,
  isSigninUp: false,
  isLogin: false,
  isUpdateProfile: false,
  isCheckAuth: true,
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get('/auth/check');
      set({ authUser: res.data });
    } catch (error) {
      console.log('Error in CheckAuth', error);

      set({ authUser: null });
    } finally {
      set({ isCheckAuth: false });
    }
  },
  signup: async (data) => {
    try {
      const res = await axiosInstance.post('/auth/signup', data);
      toast.success('Account created successfully!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        icon: <CheckCircle className="text-success" />,
      });
      set({ authUser: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isSigninUp: false });
    }
  },
}));
