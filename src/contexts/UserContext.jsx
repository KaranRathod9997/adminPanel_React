
import React, { createContext, useContext, useState, useEffect } from "react";

const mockUsers = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    role: "Admin",
    status: "Active",
    lastActive: "5m ago",
    avatarInitials: "AJ",
  },
  {
    id: "2",
    name: "Bob Smith",
    email: "bob.smith@example.com",
    role: "Editor",
    status: "Active",
    lastActive: "2h ago",
    avatarInitials: "BS",
  },
  {
    id: "3",
    name: "Carol Williams",
    email: "carol.williams@example.com",
    role: "Viewer",
    status: "Inactive",
    lastActive: "3d ago",
    avatarInitials: "CW",
  },
  {
    id: "4",
    name: "Dave Brown",
    email: "dave.brown@example.com",
    role: "Editor",
    status: "Active",
    lastActive: "1h ago",
    avatarInitials: "DB",
  },
  {
    id: "5",
    name: "Eve Davis",
    email: "eve.davis@example.com",
    role: "Viewer",
    status: "Active",
    lastActive: "Just now",
    avatarInitials: "ED",
  },
];

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);

  // Initialize with mock data
  useEffect(() => {
    const storedUsers = localStorage.getItem("admin-users");
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    } else {
      setUsers(mockUsers);
      localStorage.setItem("admin-users", JSON.stringify(mockUsers));
    }
  }, []);

  // Update localStorage when users change
  useEffect(() => {
    localStorage.setItem("admin-users", JSON.stringify(users));
  }, [users]);

  const addUser = (userData) => {
    const newUser = {
      ...userData,
      id: Date.now().toString(),
      lastActive: "Just now",
      avatarInitials: getInitials(userData.name),
    };

    setUsers((prevUsers) => [...prevUsers, newUser]);
  };

  const deleteUser = (id) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  };

  const totalUsers = users.length;
  const activeUsers = users.filter((user) => user.status === "Active").length;

  return (
    <UserContext.Provider value={{ users, addUser, deleteUser, totalUsers, activeUsers }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUsers = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUsers must be used within a UserProvider");
  }
  return context;
};
