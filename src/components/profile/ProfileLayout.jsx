import { NavLink, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { LogoutButton } from '../../components';
import { MdOutlineAccountCircle, MdOutlineArticle, MdOutlineBookmarks } from "react-icons/md";
import { Container } from '../../components';
import { useSelector } from "react-redux";

const ProfileLayout = () => {
    const [user, setUser] = useState(null);

    const navLinkStyle = (isActive) =>
        `flex items-center px-4 py-3 rounded-md transition ${isActive
            ? 'bg-black text-white'
            : 'bg-gray-100 text-black hover:bg-gray-200'
        }`;

    const userData = useSelector(state => state.auth.userData);

    useEffect(() => {
        setUser({
            name: userData.name,
            email: userData.email
        });
    }, [userData]);

    const avatarSeed = user?.name || "default";
    const avatarUrl = `https://avatar.iran.liara.run/public/boy`;

    return (
        <Container className="py-8 px-0">
            <div className="min-h-[70vh] flex flex-col lg:flex-row gap-6">
                {/* Sidebar */}
                <aside className="w-full lg:w-64 bg-white p-3 md:p-6 shadow-md rounded-lg">
                    <div className="text-center mb-6">
                        <img
                            src={avatarUrl}
                            alt="avatar"
                            className="w-20 h-20 mx-auto rounded-full border-2 border-gray-200"
                        />
                        <h2 className="mt-2 font-bold text-lg">{user?.name}</h2>
                        <p className="text-sm text-gray-500 break-words">{user?.email}</p>
                    </div>

                    <nav className="flex flex-col gap-4 text-base">
                        <NavLink
                            to="/profile"
                            end
                            className={({ isActive }) => navLinkStyle(isActive)}
                        >
                            <MdOutlineAccountCircle className="text-xl mr-2" />
                            Profile
                        </NavLink>

                        <NavLink
                            to="/profile/myblogs"
                            className={({ isActive }) => navLinkStyle(isActive)}
                        >
                            <MdOutlineArticle className="text-xl mr-2" />
                            Your Blogs
                        </NavLink>

                        <NavLink
                            to="/profile/savedblogs"
                            className={({ isActive }) => navLinkStyle(isActive)}
                        >
                            <MdOutlineBookmarks className="text-xl mr-2" />
                            Saved Blogs
                        </NavLink>

                        <LogoutButton />
                    </nav>
                </aside>

                {/* Main content */}
                <main className="flex-1 lg:p-10 rounded-lg">
                    <Outlet />
                </main>
            </div>
        </Container>
    );
};

export default ProfileLayout;
