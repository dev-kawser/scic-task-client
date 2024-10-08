import { useState, useRef, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../../ContextProvider/AuthProvider';

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const location = useLocation();

    const [dropDownState, setDropDownState] = useState(false);
    const dropDownMenuRef = useRef();

    useEffect(() => {
        const closeDropDown = (e) => {
            if (!dropDownMenuRef?.current?.contains(e?.target)) {
                setDropDownState(false);
            }
        };

        document.addEventListener('mousedown', closeDropDown);

        return () => {
            document.removeEventListener('mousedown', closeDropDown);
        };
    }, []);

    // Helper function to determine if a link is active
    const isActive = (path) => location.pathname === path ? 'text-blue-600' : 'hover:text-gray-600';

    return (
        <div className="bg-white shadow-md sticky top-0 z-50">
            <nav className="flex items-center justify-between max-w-7xl mx-auto px-4 py-3">
                {/* Brand Logo */}
                <Link to="/" className="text-2xl font-semibold text-gray-800 hover:text-gray-600">
                    ProductPrism
                </Link>

                {/* Desktop Menu */}
                <ul className="hidden md:flex space-x-8 font-medium text-gray-800">
                    <li>
                        <Link to="/" className={`hover:text-gray-600 ${isActive('/')}`}>Home</Link>
                    </li>
                    <li>
                        <Link to="/products" className={`hover:text-gray-600 ${isActive('/products')}`}>Products</Link>
                    </li>
                    <li>
                        <Link to="/addProduct" className={`hover:text-gray-600 ${isActive('/addProduct')}`}>Add Product</Link>
                    </li>

                    {
                        user ?
                            <li className="text-red-500 hover:text-red-700 font-semibold border-red-500 border-l-2 pl-2 btn cursor-pointer" onClick={logOut} >Logout</li>
                            :
                            <>
                                <li>
                                    <Link to="/login" className={`hover:text-gray-600 ${isActive('/login')}`}>Login</Link>
                                </li>
                                <li>
                                    <Link to="/register" className={`hover:text-gray-600 ${isActive('/register')}`}>Register</Link>
                                </li>
                            </>
                    }
                </ul>

                {/* Mobile Menu Toggle */}
                <div
                    ref={dropDownMenuRef}
                    onClick={() => setDropDownState(!dropDownState)}
                    className="md:hidden flex items-center cursor-pointer"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-gray-800"
                    >
                        <line x1="4" x2="20" y1="12" y2="12" />
                        <line x1="4" x2="20" y1="6" y2="6" />
                        <line x1="4" x2="20" y1="18" y2="18" />
                    </svg>
                </div>


                {/* Mobile Dropdown Menu */}
                {dropDownState && (
                    <ul className="absolute right-0 top-full mt-2 w-48 bg-gray-800 text-white rounded-lg shadow-lg z-50 md:hidden">
                        <li>
                            <Link to="/" className={`block px-6 py-3 ${isActive('/')}`}>Home</Link>
                        </li>
                        <li>
                            <Link to="/products" className={`block px-6 py-3 ${isActive('/products')}`}>Products</Link>
                        </li>
                        <li>
                            <Link to="/addProduct" className={`block px-6 py-3 ${isActive('/addProduct')}`}>Add Product</Link>
                        </li>
                        {
                            user ?
                                <li className="block px-6 py-3 text-red-500 hover:text-red-700 font-semibold cursor-pointer" onClick={logOut}>Logout</li>
                                :
                                <>
                                    <li>
                                        <Link to="/login" className={`block px-6 py-3 ${isActive('/login')}`}>Login</Link>
                                    </li>
                                    <li>
                                        <Link to="/register" className={`block px-6 py-3 ${isActive('/register')}`}>Register</Link>
                                    </li>
                                </>
                        }
                    </ul>
                )}

            </nav>
        </div>
    );
};

export default Navbar;
