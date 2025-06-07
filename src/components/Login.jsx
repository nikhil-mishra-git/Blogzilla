import { useForm } from "react-hook-form";
import { FaEnvelope, FaLock } from "react-icons/fa";

const Login = () => {
    const { register, handleSubmit } = useForm();

    const onSubmit = (data) => {
        console.log("Login Data: ", data);
        // You can connect Appwrite login here
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white rounded-2xl shadow-lg p-8 max-w-sm w-full">
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-900">
                    Login to Blogzilla
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="relative">
                        <FaEnvelope className="absolute left-4 top-3.5 text-gray-400" />
                        <input
                            type="email"
                            placeholder="Email"
                            {...register("email")}
                            className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-full outline-none focus:bg-white"
                        />
                    </div>

                    <div className="relative">
                        <FaLock className="absolute left-4 top-3.5 text-gray-400" />
                        <input
                            type="password"
                            placeholder="Password"
                            {...register("password")}
                            className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-full outline-none focus:bg-white"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 rounded-full bg-black text-white hover:opacity-90 transition font-semibold"
                    >
                        Sign In
                    </button>
                </form>

                <div className="my-4 text-center text-gray-400">OR</div>

                <button className="w-full flex items-center justify-center gap-2 py-2 border rounded-full hover:bg-gray-50 transition">
                    <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
                    <span className="text-gray-700 font-medium">Continue with Google</span>
                </button>

                <p className="mt-6 text-center text-sm text-gray-600">
                    Don't have an account?{" "}
                    <span className="text-black font-semibold cursor-pointer hover:underline">
                        Sign up
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Login;
