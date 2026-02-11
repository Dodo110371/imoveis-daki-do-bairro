"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { User as SupabaseUser } from '@supabase/supabase-js';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar_url?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  role?: 'user' | 'admin';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password?: string) => Promise<{ error: any }>;
  signInWithGoogle: () => Promise<{ error: any }>;
  logout: () => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<{ error: any }>;
  updateProfile: (data: Partial<User>) => Promise<{ error: any }>;
  deleteAccount: () => Promise<{ error: any }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();

        if (session?.user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();

          setUser({
            id: session.user.id,
            email: session.user.email!,
            name: profile?.full_name || session.user.user_metadata?.full_name || 'Usuário',
            avatar_url: profile?.avatar_url,
            phone: profile?.phone,
            address: profile?.address,
            city: profile?.city,
            state: profile?.state,
            zip_code: profile?.zip_code,
            role: profile?.role,
          });
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Error checking auth session:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        setUser({
          id: session.user.id,
          email: session.user.email!,
          name: profile?.full_name || session.user.user_metadata?.full_name || 'Usuário',
          avatar_url: profile?.avatar_url,
          phone: profile?.phone,
          address: profile?.address,
          city: profile?.city,
          state: profile?.state,
          zip_code: profile?.zip_code,
          role: profile?.role,
        });
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password?: string) => {
    setIsLoading(true);

    if (!password) {
      const { error } = await supabase.auth.signInWithOtp({ email });
      setIsLoading(false);
      return { error };
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setIsLoading(false);
    return { error };
  };

  const signInWithGoogle = async () => {
    setIsLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) setIsLoading(false);
    return { error };
  };

  const register = async (email: string, password: string, name: string) => {
    setIsLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
        },
      },
    });

    setIsLoading(false);
    return { error };
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push('/');
    router.refresh();
  };

  const updateProfile = async (data: Partial<User>) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: data.name,
          phone: data.phone,
          address: data.address,
          city: data.city,
          state: data.state,
          zip_code: data.zip_code,
          avatar_url: data.avatar_url,
        })
        .eq('id', user?.id);

      if (error) throw error;

      setUser((prev) => prev ? { ...prev, ...data } : null);
      return { error: null };
    } catch (error) {
      return { error };
    }
  };

  const deleteAccount = async () => {
    try {
      const { error } = await supabase.rpc('delete_own_account');
      if (error) throw error;
      await logout();
      return { error: null };
    } catch (error) {
      console.error("Error deleting account:", error);
      return { error };
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      signInWithGoogle,
      logout,
      register,
      updateProfile,
      deleteAccount
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
