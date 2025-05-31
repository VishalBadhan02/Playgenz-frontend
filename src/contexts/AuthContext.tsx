
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useAsync } from '@/hooks/use-async';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
  loading: boolean;
  authLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { loading: authLoading, execute, ServerErrorModal } = useAsync();

  useEffect(() => {
    // Check if there is a token in localStorage
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
    setLoading(false);
  }, []);

  const login = (token: any) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
    navigate('/home');
    toast({
      title: "Success",
      description: "You have been logged in successfully",
    });
  };

  const logout = () => {
    // Simulate an API call to log out
    execute(
      new Promise<void>((resolve) => {
        setTimeout(() => {
          localStorage.removeItem('token');
          setIsAuthenticated(false);
          resolve();
        }, 500);
      }),
      {
        successMessage: "You have been logged out successfully",
      }
    ).then(() => {
      navigate('/login');
    });
  };

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      login,
      logout,
      loading,
      authLoading
    }}>
      {children}
      <ServerErrorModal />
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
