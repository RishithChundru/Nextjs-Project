import {create} from 'zustand';
import Cookies from 'js-cookie';

type AuthState = {
  token: string | null;
  role?: string | null;
  setToken: (token: string | null, role?: string | null) => void;
  logout: () => void;
};

export const useStore = create<AuthState>((set) => ({
  token: Cookies.get('token') || null,
  role: Cookies.get('role') || null,
  setToken: (token, role) => {
    if (token) {
      Cookies.set('token', token);
      if (role) Cookies.set('role', role);
    } else {
      Cookies.remove('token');
      Cookies.remove('role');
    }
    set(() => ({ token, role }));
  },
  logout: () => {
    Cookies.remove('token');
    Cookies.remove('role');
    set(() => ({ token: null, role: null }));
  },
}));
  