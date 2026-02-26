'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

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

type AuthError = { message?: string } | null;

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password?: string) => Promise<{ error: AuthError }>;
  signInWithGoogle: (redirectUrl?: string) => Promise<{ error: AuthError }>;
  logout: () => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<{ data?: any; error: AuthError }>;
  updateProfile: (data: Partial<User>) => Promise<{ error: AuthError }>;
  deleteAccount: () => Promise<{ error: AuthError }>;
  resetPasswordForEmail: (email: string) => Promise<{ error: AuthError }>;
  updatePassword: (password: string) => Promise<{ error: AuthError }>;
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
  }, [supabase]);

  const login = async (email: string, password?: string) => {
    setIsLoading(true);

    try {
      if (!password) {
        const { error } = await supabase.auth.signInWithOtp({ email });
        return { error };
      }

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      return { error };
    } catch (error) {
      return { error: error as AuthError };
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithGoogle = async (redirectUrl?: string) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback${redirectUrl ? `?next=${redirectUrl}` : ''}`,
        },
      });
      return { error };
    } catch (error) {
      return { error: error as AuthError };
    } finally {
      // For OAuth, we might redirect away, so setting loading to false is fine
      // but if redirect happens, component unmounts.
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string) => {
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          data: {
            full_name: name,
          },
        },
      });

      if (error) {
        return { data: null, error };
      }

      if (data?.session && data.user) {
        // Wait for profile to be created by trigger or create it manually if needed
        // For robustness, we just set the user state with metadata first
        // If we really need the profile from DB, we should handle the race condition
        // where trigger might not have run yet.
        
        // Let's try to fetch, but handle null safely.
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .single();

        setUser({
          id: data.user.id,
          email: data.user.email!,
          name: profile?.full_name || data.user.user_metadata?.full_name || 'Usuário',
          avatar_url: profile?.avatar_url,
          phone: profile?.phone,
          address: profile?.address,
          city: profile?.city,
          state: profile?.state,
          zip_code: profile?.zip_code,
          role: profile?.role,
        });
      }

      return { data, error: null };
    } catch (error) {
      return { data: null, error: error as AuthError };
    } finally {
      setIsLoading(false);
    }
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
      return { error: error as AuthError };
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
      return { error: error as AuthError };
    }
  };

  const resetPasswordForEmail = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/callback?next=/redefinir-senha`,
      });
      return { error };
    } catch (error) {
      return { error: error as AuthError };
    }
  };

  const updatePassword = async (password: string) => {
    try {
      const { error } = await supabase.auth.updateUser({ password });
      return { error };
    } catch (error) {
      return { error: error as AuthError };
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
      deleteAccount,
      resetPasswordForEmail,
      updatePassword
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
