import { useEffect } from 'react';
import { useAuthStore } from '../store/authStore';

interface JWTMiddlewareProps {
  children: React.ReactNode;
}

export const JWTMiddleware = ({ children }: JWTMiddlewareProps) => {
  const { initAuth, token } = useAuthStore();

  useEffect(() => {
    initAuth();
  }, []);

  return <>{children}</>;
};

// Token validation
export const isTokenValid = (token: string): boolean => {
  if (!token) return false;

  try {
    const parts = token.split('.');
    if (parts.length !== 3) return false;

    const decoded = JSON.parse(atob(parts[1]));
    const expirationTime = decoded.exp * 1000;

    return Date.now() < expirationTime;
  } catch (error) {
    return false;
  }
};

// Get token from storage
export const getToken = (): string | null => {
  return localStorage.getItem('token');
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  const token = getToken();
  return token ? isTokenValid(token) : false;
};
