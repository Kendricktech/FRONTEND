import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell } from "lucide-react";
import { authenticatedFetch } from "../utils/auth";
import API_BASE_URL from "../utils/Setup";

const NotificationBell = () => {
  const [unreadCount, setUnreadCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const fetchWithTimeout = (url, options = {}, timeout = 2000) => {
      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), timeout);

      return authenticatedFetch(url, { ...options, signal: controller.signal })
        .finally(() => clearTimeout(id));
    };

    const fetchUnreadCount = async () => {
      try {
        const res = await fetchWithTimeout(
          `${API_BASE_URL}/notification/count/`,
          { method: "GET" }
        );

        if (!isMounted) return;
        if (!res.ok) {
          console.warn("Unread count fetch returned status", res.status);
          return;
        }

        const { unread_count } = await res.json();
        if (typeof unread_count === 'number' && isMounted) {
          setUnreadCount(unread_count);
        }
      } catch (err) {
        if (err.name === "AbortError") {
          console.warn("Unread count fetch timed out.");
        } else {
          console.error("Unread count fetch failed:", err);
        }
      }
    };

    // Fetch on component mount
    fetchUnreadCount();

    // Add event listener for page visibility changes
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        fetchUnreadCount();
      }
    };
    
    // Add event listener for page focus
    const handleFocus = () => {
      fetchUnreadCount();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("focus", handleFocus);

    return () => {
      isMounted = false;
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.addEventListener("focus", handleFocus);
      console.log("NotificationBell unmounted");
    };
  }, []);

  return (
    <div
      className="relative cursor-pointer"
      onClick={() => navigate("/notifications")}
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