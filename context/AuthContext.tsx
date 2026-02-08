"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, name: string) => Promise<void>;
  logout: () => void;
  register: (email: string, name: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check for persisted user in localStorage
    const storedUser = localStorage.getItem('imoveis_auth_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Failed to parse user from localStorage', e);
        localStorage.removeItem('imoveis_auth_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, name: string = 'Usuário') => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser = {
      id: 'user-' + Date.now(),
      name,
      email,
    };
    
    setUser(mockUser);
    localStorage.setItem('imoveis_auth_user', JSON.stringify(mockUser));
    setIsLoading(false);
  };

  const register = async (email: string, name: string) => {
    // For this mock implementation, register is same as login
    return login(email, name);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('imoveis_auth_user');
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      isLoading, 
      login, 
      logout,
      register
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
