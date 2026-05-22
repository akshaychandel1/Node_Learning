export interface User {
  id?: number;
  name: string;
  email: string;
  role?: string;
  permissions?: Record<string, boolean>;
}

export interface Note {
  id?: number;
  title: string;
  content: string;
  userId?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}
