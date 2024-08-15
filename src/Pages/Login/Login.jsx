import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../ContextProvider/AuthProvider";
import toast from "react-hot-toast";

const Login = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { loginUser, googleUser, user } = useContext(AuthContext);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const handleGoogleLogin = () => {
        googleUser().then(() => {
            toast.success("Google login successful!");
            navigate(location?.state ? location.state : "/");
        }).catch(() => {
            toast.error("Google login failed. Please try again.");
        });
    };

    const onSubmit = (data) => {
        const email = data.email;
        const password = data.password;

        loginUser(email, password)
            .then(() => {
                toast.success("Successfully logged in!");
                navigate(location?.state ? location.state : "/");
            })
            .catch(() => {
                toast.warn("User not found. Please check your password.");
            });
    };

    useEffect(() => {
        if (user) {
            navigate(location.state || "/");
        }
    }, [location.state, navigate, user]);

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 font-semibold">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            {...register("email", { required: "Email is required" })}
                        />
                        {errors.email && (
                            <small className="text-red-500">{errors.email.message}</small>
                        )}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700 font-semibold">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            {...register("password", { required: "Password is required" })}
                        />
                        {errors.password && (
                            <small className="text-red-500">{errors.password.message}</small>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Login
                    </button>
                </form>

                <div className="my-6 text-center">
                    <Link to="/register" className="text-blue-500 hover:underline">
                        Sign up here
                    </Link>
                </div>

                <hr className="mb-6" />

                <button
                    onClick={handleGoogleLogin}
                    type="button"
                    className="w-full py-2 px-4 bg-white text-gray-700 border border-gray-300 rounded-md shadow-md hover:bg-gray-100 flex items-center justify-center"
                >
                    <svg viewBox="-0.5 0 48 48" version="1.1" className="w-6 h-6 mr-2" xmlns="http://www.w3.org/2000/svg" fill="#000000">
                        <g id="SVGRepo_tracerCarrier"></g>
                        <g id="SVGRepo_iconCarrier">
                            <g id="Icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                <g id="Color-" transform="translate(-401.000000, -860.000000)">
                                    <g id="Google" transform="translate(401.000000, 860.000000)">
                                        <path d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24" id="Fill-1" fill="#FBBC05"></path>
                                        <path d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333" id="Fill-2" fill="#EB4335"></path>
                                        <path d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667" id="Fill-3" fill="#34A853"></path>
                                        <path d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24" id="Fill-4" fill="#4285F4"></path>
                                    </g>
                                </g>
                            </g>
                        </g>
                    </svg>
                    Continue with Google
                </button>
            </div>
        </div>
    );
};

export default Login;
