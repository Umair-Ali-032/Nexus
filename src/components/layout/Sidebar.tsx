import React from "react";
import { NavLink } from "react-router-dom";
import { Home, Building2, CircleDollarSign, Users, MessageCircle, Bell, FileText, Settings, HelpCircle, Video  } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
export const Sidebar: React.FC = () => {
  const { user } = useAuth(); // Get user from AuthContext

  if (!user) return null; // hide sidebar if not logged in

  const SidebarItem = ({ to, icon, text }: any) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 p-2 rounded-lg ${
          isActive
            ? "bg-blue-500 text-white"
            : "text-gray-700 hover:bg-gray-200"
        }`
      }
    >
      {icon}
      <span className="hidden sm:inline">{text}</span>
    </NavLink>
  );

  // Menu based on role
  const menu = user.role === "entrepreneur"
    ? [
        { to: "/dashboard/entrepreneur", icon: <Home size={18} />, text: "Dashboard" },
        { to: `/profile/entrepreneur/${user.id}`, icon: <Building2 size={18} />, text: "My Startup" },
        { to: "/investors", icon: <CircleDollarSign size={18} />, text: "Investors" },
        { to: "/payments", icon: <CircleDollarSign size={18} />, text: "Payments" },
        { to: "/messages", icon: <MessageCircle size={18} />, text: "Messages" },
        { to: "/dashboard/videocallpage", icon: <Video size={18} />, text: "Video Call" },
        { to: "/notifications", icon: <Bell size={18} />, text: "Notifications" },
        { to: "/documents", icon: <FileText size={18} />, text: "Documents" } ,
        { to: "/newmodule", icon: <FileText size={18} />, text: "New Module" }
      ]
    : [
        { to: "/dashboard/investor", icon: <Home size={18} />, text: "Dashboard" },
        { to: `/profile/investor/${user.id}`, icon: <CircleDollarSign size={18} />, text: "Portfolio" },
        { to: "/entrepreneurs", icon: <Users size={18} />, text: "Startups" },
        { to: "/messages", icon: <MessageCircle size={18} />, text: "Messages" },
         { to: "/dashboard/videocallpage", icon: <Video size={18} />, text: "Video Call" },
        { to: "/payments", icon: <CircleDollarSign size={18} />, text: "Payments" },
        { to: "/notifications", icon: <Bell size={18} />, text: "Notifications" },
        { to: "/deals", icon: <FileText size={18} />, text: "Deals" }
      ];

  return (
    <div className="w-64 h-screen bg-white border-r p-4">
      <div className="space-y-2">
        {menu.map((item, i) => (
          <SidebarItem key={i} {...item} />
        ))}
      </div>
      <div className="mt-10 space-y-2">
        <SidebarItem to="/settings" icon={<Settings size={18} />} text="Settings" />
        <SidebarItem to="/help" icon={<HelpCircle size={18} />} text="Help" />
        
      </div>
    </div>
  );
};