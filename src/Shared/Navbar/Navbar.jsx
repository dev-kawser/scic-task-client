import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
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
                        <Link to="/" className="hover:text-gray-600">Home</Link>
                    </li>
                    <li>
                        <Link to="/products" className="hover:text-gray-600">Products</Link>
                    </li>
                    <li>
                        <Link to="/addProduct" className="hover:text-gray-600">Add Product</Link>
                    </li>
                    <li>
                        <Link to="/login" className="hover:text-gray-600">Login</Link>
                    </li>
                    <li>
                        <Link to="/register" className="hover:text-gray-600">Register</Link>
                    </li>
                </ul>

                {/* Mobile Menu Toggle */}
                <div
                    ref={dropDownMenuRef}
                    onClick={() => setDropDownState(!dropDownState)}
                    className="md:hidden flex items-center"
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
                        className="cursor-pointer text-gray-800"
                    >
                        <line x1="4" x2="20" y1="12" y2="12" />
                        <line x1="4" x2="20" y1="6" y2="6" />
                        <line x1="4" x2="20" y1="18" y2="18" />
                    </svg>
                </div>

                {/* Mobile Dropdown Menu */}
                {dropDownState && (
                    <ul className="absolute right-2 top-12 mt-4 w-48 bg-gray-800 text-white rounded-lg shadow-lg z-10 md:hidden">
                        <li>
                            <Link to="/" className="block px-6 py-3 hover:bg-gray-700">Home</Link>
                        </li>
                        <li>
                            <Link to="/products" className="block px-6 py-3 hover:bg-gray-700">Products</Link>
                        </li>
                        <li>
                            <Link to="/addProduct" className="block px-6 py-3 hover:bg-gray-700">Add Product</Link>
                        </li>
                        <li>
                            <Link to="/login" className="block px-6 py-3 hover:bg-gray-700">Login</Link>
                        </li>
                        <li>
                            <Link to="/register" className="block px-6 py-3 hover:bg-gray-700">Register</Link>
                        </li>
                    </ul>
                )}
            </nav>
        </div>
    );
};

export default Navbar;
