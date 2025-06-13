import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ProfileDetail = () => {
  const [user, setUser] = useState(null);
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    if (userData) {
      setUser({
        name: userData.name,
        email: userData.email,
      });
    }
  }, [userData]);

  const avatarUrl = `https://avatar.iran.liara.run/public/boy`;

  return (
    <div className="max-w-sm mx-auto mt-20 p-8 rounded-xl shadow-md bg-white text-center text-black">
      <div className="w-28 h-28 mx-auto rounded-full overflow-hidden border-4 border-gray-200 mb-5 transition-transform duration-300 hover:scale-105">
        <img
          src={avatarUrl}
          alt="User Avatar"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || "")}&background=f6f9fc&color=555&size=128`;
          }}
          className="w-full h-full object-cover"
        />
      </div>
      <h2 className="text-3xl font-semibold mb-2">{user?.name || "Loading..."}</h2>
      <p className="text-gray-600 mb-6">{user?.email}</p>
    </div>
  );
};

export default ProfileDetail;
