import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell } from "lucide-react";
import { authenticatedFetch } from "../utils/auth";
import API_BASE_URL from "../utils/Setup";

const NotificationBell = () => {
  const [unreadCount, setUnreadCount] = useState(0);
  const navigate = useNavigate();
  
  const handleBellClick = () => {
    // First navigate to notifications
    navigate("/notifications");
    
    // Then reset the counter to zero
    setUnreadCount(0);
    
    // Optionally mark notifications as read on the server
    // You can add server call here if needed
  };
  
  return (
    <div
      className="relative cursor-pointer"
      onClick={handleBellClick}
    >
      <Bell className="text-white hover:text-blue-400" size={24} />
      {unreadCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full h-4 w-4 text-xs flex items-center justify-center">
          {unreadCount}
        </span>
      )}
    </div>
  );
};

export default NotificationBell;