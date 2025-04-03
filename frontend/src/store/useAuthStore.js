import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import { toast } from 'react-toastify';
import { io } from 'socket.io-client';

const BASE_URL =
  import.meta.env.MODE === 'development' ? 'http://localhost:5000' : '/';

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigninUp: false,
  isLogin: false,
  isUpdateProfile: false,
  isCheckAuth: true,
  onlineUsers: [],
  socket: null,
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get('/auth/check');
      set({ authUser: res.data });
      get().connectSocket();
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
      });
      get().connectSocket();

      set({ authUser: res.data });
    } catch (error) {
      toast.error(error.response.data.msg);
    } finally {
      set({ isSigninUp: false });
    }
  },
  logout: async () => {
    try {
      await axiosInstance.post('/auth/logout');
      set({ authUser: null });
      toast.success('Logout successfully!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      get().disconnectSocket();
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  },
  login: async (data) => {
    try {
      const res = await axiosInstance.post('/auth/login', data);
      set({ authUser: res.data });
      toast.success('Login successfully!');
      get().connectSocket();
    } catch (error) {
      toast.error(error.response.data.msg);
    } finally {
      set({ isLogin: false });
    }
  },
  updateProfile: async (data) => {
    set({ isUpdateProfile: true });
    try {
      const res = await axiosInstance.put('/auth/update-profile', data);
      set({ authUser: res.data });

      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error(error.response.data.msg);
      console.log(error);
    } finally {
      set({ isUpdateProfile: false });
    }
  },
  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;

    const socket = io(BASE_URL, {
      query: {
        userId: authUser._id,
      },
    });
    socket.connect();

    set({ socket: socket });

    socket.on('getOnlineUsers', (userIds) => {
      set({ onlineUsers: userIds });
    });
  },
  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
  updateUsername: async (newFullName) => {
    set({ isUpdateProfile: true });
    try {
      const res = await axiosInstance.put('/auth/change-username', {
        fullName: newFullName.trim(),
      });

      set({ authUser: res.data }); // อัปเดต authUser ใน Zustand
      toast.success('Username updated successfully!');
    } catch (error) {
      toast.error(error.response?.data?.msg || 'Failed to update username.');
    } finally {
      set({ isUpdateProfile: false });
    }
  },
}));
