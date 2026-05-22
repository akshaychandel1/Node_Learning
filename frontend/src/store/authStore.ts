import { create } from 'zustand';
import { User } from '../types';

interface AuthStore {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
  initAuth: () => void;
}

const _token = localStorage.getItem('token');
const _userStr = localStorage.getItem('user');
const _user = _userStr ? JSON.parse(_userStr) : null;

export const useAuthStore = create<AuthStore>((set) => ({
  user: _user,
  token: _token,
  isAuthenticated: !!(_token && _user),

  setUser: (user) => set({ user }),

  setToken: (token) => set({ token }),

  setAuth: (user, token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    set({ user, token, isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    set({ user: null, token: null, isAuthenticated: false });
  },

  initAuth: () => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token && user) {
      set({ token, user: JSON.parse(user), isAuthenticated: true });
    }
  },
}));
