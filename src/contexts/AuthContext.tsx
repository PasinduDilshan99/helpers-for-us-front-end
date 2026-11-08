"use client";
import {
  GET_USER_DETAILS_FOR_LOGIN_DATA_FE,
  LOGIN_FE,
  LOGOUT_FE,
  SIGNUP_FE,
} from "@/utils/frontEndConstant";
import React, { createContext, useContext, useEffect, useState } from "react";

export type User = {
  id: number;
  username: string;
  roles: string[];
  privileges: string[];
  firstName: string;
  lastName: string;
  email: string;
  imageUrl: string;
};

// Signup types
export type SignupData = {
  username: string;
  password: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  mobileNumber1: string;
  mobileNumber2?: string;
};

export type LoginResponseData = {
  message: string;
  username: string;
  uniqueCode: string;
  accessTokenExpiresAt: string;
  refreshTokenExpiresAt: string;
};

export type ApiResponse<T> = {
  code: number;
  status: string;
  message: string;
  data: T;
  timestamp: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<LoginResponseData>;
  signup: (signupData: SignupData) => Promise<string>;
  logout: () => Promise<void>;
  hasRole: (role: string) => boolean;
  hasPrivilege: (priv: string) => boolean;
  fetchMe: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => {
    throw new Error("Login function not implemented");
  },
  signup: async () => {
    throw new Error("Signup function not implemented");
  },
  logout: async () => {},
  hasRole: () => false,
  hasPrivilege: () => false,
  fetchMe: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // -----------------------
  // SIGNUP
  // -----------------------
  const signup = async (signupData: SignupData): Promise<string> => {
    const res = await fetch(SIGNUP_FE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signupData),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Signup failed");
    }

    const responseBody: ApiResponse<string> = await res.json();
    return responseBody.data;
  };

  // -----------------------
  // LOGIN
  // -----------------------
  const login = async (
    username: string,
    password: string,
  ): Promise<LoginResponseData> => {
    const res = await fetch(LOGIN_FE, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Login failed");
    }

    const responseBody: ApiResponse<LoginResponseData> = await res.json();
    const data = responseBody.data;

    // Save uniqueCode in session
    sessionStorage.setItem("uniqueCode", data.uniqueCode);
    document.cookie = `uniqueCode=${data.uniqueCode}; path=/; SameSite=Lax`;

    // Fetch user details
    await fetchMe();

    return data;
  };

  // -----------------------
  // FETCH USER DETAILS
  // -----------------------
  const fetchMe = async (): Promise<void> => {
    const code = sessionStorage.getItem("uniqueCode");

    if (!code) {
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(GET_USER_DETAILS_FOR_LOGIN_DATA_FE, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        const responseBody: ApiResponse<User> = await res.json();
        const data = responseBody.data;

        setUser({
          id: data.id,
          username: data.username,
          roles: data.roles,
          privileges: data.privileges,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          imageUrl: data.imageUrl,
        });
      } else {
        setUser(null);
        sessionStorage.removeItem("uniqueCode");
      }
    } catch (error) {
      console.error("Failed to fetch user:", error);
      setUser(null);
      sessionStorage.removeItem("uniqueCode");
      await logout();
    } finally {
      setLoading(false);
    }
  };

  // -----------------------
  // LOGOUT
  // -----------------------
  const logout = async (): Promise<void> => {
    try {
      await fetch(LOGOUT_FE, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
    } catch (err) {
      console.error("Logout failed:", err);
    }

    sessionStorage.removeItem("uniqueCode");
    setUser(null);
  };

  useEffect(() => {
    fetchMe();
  }, []);

  const hasRole = (role: string) => user?.roles?.includes(role) ?? false;
  const hasPrivilege = (priv: string) =>
    user?.privileges?.includes(priv) ?? false;

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        signup,
        logout,
        hasRole,
        hasPrivilege,
        fetchMe,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);