import { createContext, useEffect } from 'react';
import type { ReactNode } from 'react';
import { useState } from 'react';
import { api } from '../services/api';

// Tipagem do usuário
interface User {
    id: string;
    name: string;
    email: string;
  }
  
  // Tipagem do contexto
  interface AuthContextData {
    user: User | null;
    signed: boolean;
    signIn: (email: string, password: string) => Promise<void>;
  }

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storagedToken = localStorage.getItem("@Auth:token");
        const storagedUser = localStorage.getItem("@Auth:user");

        if (storagedToken && storagedUser) {
            setUser(JSON.parse(storagedUser));
            api.defaults.headers.common["Authorization"] = `Bearer ${storagedToken}`;
        }
    }, []);

    const signIn = async (email: string, password: string) => {
        try {
          const response = await api.post("/auth/login", {
            email,
            password,
          });
    
          if (response.status === 200) {
            const { user, token } = response.data;
    
            setUser(user);
            api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            localStorage.setItem("@Auth:token", token);
            localStorage.setItem("@Auth:user", JSON.stringify(user));
          }
        } catch (error) {
          alert("Erro ao fazer login. Verifique suas credenciais.");
          throw new Error("Login failed");
        }
      };

    return (
        <AuthContext.Provider value={{
            user,
            signed: !!user,
            signIn,
        }}>
            {children}
        </AuthContext.Provider>
    )
};
