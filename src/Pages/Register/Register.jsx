/* eslint-disable react/no-unescaped-entities */
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { updateProfile } from "firebase/auth";
import toast from "react-hot-toast";
import { AuthContext } from "../../ContextProvider/AuthProvider";

const Register = () => {
    const { registerUser, googleUser, user } = useContext(AuthContext);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        const { email, password, userName, photoUrl } = data;

        const regex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
        if (!regex.test(password)) {
            setError("Password should have one uppercase, one lowercase, and at least 6 characters.");
            return;
        }

        registerUser(email, password)
            .then((result) => {
                updateProfile(result.user, {
                    displayName: userName,
                    photoURL: photoUrl,
                }).then(() => {
                    toast.success("Registration successful!");
                    navigate(location?.state ? location.state : "/");
                });
            })
            .catch((err) => {
                toast.error(err.message);
            });
    };

    const handleGoogleRegister = () => {
        googleUser().then(() => {
            toast.success("Registration with Google successful!");
        }).catch((err) => {
            toast.error(err.message);
        });
    };

    useEffect(() => {
        if (user) {
            navigate(location.state || "/");
        }
    }, [location.state, navigate, user]);

    return (
        <div className="flex justify-center items-center">
            <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
                <h1 className="text-3xl font-semibold mb-6 text-black text-center">Register</h1>
                <h1 className="text-sm font-semibold mb-6 text-gray-500 text-center">Join our community with all-time access and it's free!</h1>
                <button onClick={handleGoogleRegister} type="button" className="w-full flex justify-center items-center gap-2 bg-white text-sm text-gray-600 p-2 rounded-md hover:bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 transition-colors duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-4">
                        <path fill="#fbbb00" d="M113.47 309.408 95.648 375.94l-65.139 1.378C11.042 341.211 0 299.9 0 256c0-42.451 10.324-82.483 28.624-117.732h.014L86.63 148.9l25.404 57.644c-5.317 15.501-8.215 32.141-8.215 49.456.002 18.792 3.406 36.797 9.651 53.408z"></path>
                        <path fill="#518ef8" d="M507.527 208.176C510.467 223.662 512 239.655 512 256c0 18.328-1.927 36.206-5.598 53.451-12.462 58.683-45.025 109.925-90.134 146.187l-.014-.014-73.044-3.727-10.338-64.535c29.932-17.554 53.324-45.025 65.646-77.911h-136.89V208.176h245.899z"></path>
                        <path fill="#28b446" d="m416.253 455.624.014.014C372.396 490.901 316.666 512 256 512c-97.491 0-182.252-54.491-225.491-134.681l82.961-67.91c21.619 57.698 77.278 98.771 142.53 98.771 28.047 0 54.323-7.582 76.87-20.818l83.383 68.262z"></path>
                        <path fill="#f14336" d="m419.404 58.936-82.933 67.896C313.136 112.246 285.552 103.82 256 103.82c-66.729 0-123.429 42.957-143.965 102.724l-83.397-68.276h-.014C71.23 56.123 157.06 0 256 0c62.115 0 119.068 22.126 163.404 58.936z"></path>
                    </svg>
                    Sign Up with Google
                </button>
                <div className="mt-4 text-sm text-gray-600 text-center">
                    <p>or with email</p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                        <input type="text" id="username" name="username" className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300" {...register("userName", { required: true })} />
                        {errors.userName && <small className="text-red-500 font-medium mt-1">This field is required</small>}
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input type="text" id="email" name="email" className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300" {...register("email", { required: true })} />
                        {errors.email && <small className="text-red-500 font-medium mt-1">This field is required</small>}
                    </div>
                    <div className="relative">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input type={showPassword ? "text" : "password"} id="password" name="password" className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300" {...register("password", { required: true })} />
                        <span onClick={() => setShowPassword(!showPassword)} className="absolute text-xl top-9 right-6 cursor-pointer">
                            {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                        </span>
                        {errors.password && <small className="text-red-500 font-medium mt-1">This field is required</small>}
                        {error && <small className="text-red-500 font-medium mt-1">{error}</small>}
                    </div>
                    <div>
                        <label htmlFor="photo" className="block text-sm font-medium text-gray-700">Photo URL</label>
                        <input type="url" id="photo" name="photo" className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300" {...register("photoUrl", { required: true })} />
                        {errors.photoUrl && <small className="text-red-500 font-medium mt-1">This field is required</small>}
                    </div>
                    <button type="submit" className="bg-blue-500 hover:bg-[#d32f2f] text-white font-semibold rounded-md py-2 px-4 w-full">Register</button>
                </form>
                <div className="mt-4 text-sm text-gray-600 text-center">
                    <p>Already have an account? <Link to="/login" className="text-blue-500 font-semibold hover:underline">Login here</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Register;
