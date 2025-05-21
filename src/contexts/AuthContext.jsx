
import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // Initialize auth state from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("admin-user");
    const storedAuth = localStorage.getItem("admin-auth");

    if (storedUser && storedAuth === "true") {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email, password) => {
    // Mock authentication - in a real app this would call an API
    if (email === "admin@example.com" && password === "password") {
      const userData = {
        id: "1",
        name: "Admin User",
        email: email,
        role: "Admin"
      };

      setUser(userData);
      setIsAuthenticated(true);

      // Save to localStorage
      localStorage.setItem("admin-user", JSON.stringify(userData));
      localStorage.setItem("admin-auth", "true");

      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("admin-user");
    localStorage.removeItem("admin-auth");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
