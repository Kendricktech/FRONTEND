import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authenticatedFetch } from "../utils/auth";
import API_BASE_URL from "../utils/Setup";
import { Bell } from "lucide-react";
import Navbar from "./navbar";
import Footer from "./footer";

const NotificationBell = () => {
  const [unreadCount, setUnreadCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotifications = () => {
      authenticatedFetch(`${API_BASE_URL}/notification/`, {
        method: "POST",
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Notification data:", data);
          if (Array.isArray(data.notifications)) {
            const count = data.notifications.filter((n) => !n.read).length;
            setUnreadCount(count);
          }
        })
        .catch(console.error);
    };

    fetchNotifications(); // Initial call
    const interval = setInterval(fetchNotifications, 10000); // Poll every 10s
    return () => clearInterval(interval);
  }, []);

  const handleClick = () => {
    navigate("/notifications");
  };

  return (
   <>
   <Navbar/>
    <div className="relative cursor-pointer" onClick={handleClick}>
      <Bell className="text-white hover:text-blue-400" size={24} />
      {unreadCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full h-4 w-4 text-xs flex items-center justify-center">
          {unreadCount}
        </span>
      )}
    </div>
    <Footer/>
   </>
  );
};

export default NotificationBell;
