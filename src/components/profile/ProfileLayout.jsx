import { NavLink, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { LogoutButton } from '../../components';
import { MdOutlineAccountCircle, MdOutlineArticle } from "react-icons/md";
import { Container } from '../../components'
import { useSelector } from "react-redux";

const ProfileLayout = () => {
    const [user, setUser] = useState(null);

    const navLinkStyle = (isActive) =>
        `flex items-center px-4 py-3 rounded-md transition ${isActive
            ? 'bg-black text-white'
            : 'bg-gray-100 text-black hover:bg-gray-200'
        }`;

    const userData = useSelector(state => state.auth.userData)

    useEffect(() => {
        setUser({
            name: userData.name,
            email: userData.email
        });
    }, []);

    

    const avatarSeed = user?.name || "default";
    const avatarUrl = `https://avatar.iran.liara.run/public/boy`;

    return (
        <Container className="py-8">
            <div className="min-h-[70vh] bg-[#f6f9fc] flex">
                {/* Sidebar */}
                <aside className="w-64 bg-white p-6 shadow-md">
                    <div className="text-center mb-6">
                        <img
                            src={avatarUrl}
                            alt="avatar"
                            className="w-20 h-20 mx-auto rounded-full border-2 border-gray-200"
                        />
                        <h2 className="mt-2 font-bold text-lg">{user?.name}</h2>
                        <p className="text-sm text-gray-500 break-all">{user?.email}</p>
                    </div>

                    <nav className="flex flex-col gap-5 text-base">
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

                        <LogoutButton />
                    </nav>
                </aside>

                <main className="flex-1 p-10">
                    <Outlet />
                </main>
            </div>
        </Container>
    );
};


export default ProfileLayout;
