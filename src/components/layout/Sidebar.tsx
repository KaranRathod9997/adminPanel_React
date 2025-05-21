
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, Users, FileText, ChevronRight, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const navItems = [
    {
      title: "Dashboard",
      path: "/",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      title: "Users",
      path: "/users",
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: "Content",
      path: "/content",
      icon: <FileText className="h-5 w-5" />,
    },
  ];

  return (
    <div
      className={cn(
        "bg-card border-r border-border h-screen transition-all duration-300 flex flex-col",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-border">
        {!collapsed && (
          <div className="font-bold text-lg text-primary">Admin Panel</div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className={cn("ml-auto", collapsed && "mx-auto")}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </Button>
      </div>

      <nav className="flex-1 pt-4">
        <ul className="space-y-1 px-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-accent text-foreground hover:text-accent-foreground"
                  )
                }
              >
                {item.icon}
                {!collapsed && <span>{item.title}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-border mt-auto">
        {!collapsed && (
          <div className="text-xs text-muted-foreground">
            Admin Panel v1.0
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
