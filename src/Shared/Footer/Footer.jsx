import { Link } from "react-router-dom";


const Footer = () => {
    return (
        <footer className="flex flex-col lg:mt-10 mt-5">
            <div className="flex flex-col items-center justify-around gap-5 bg-gray-300 py-8 dark:bg-gray-500 dark:text-white md:flex-row md:gap-0">
                <h5 className="text-2xl font-bold">ProductPrism</h5>
                <nav className="text-lg">
                    <ul className="flex h-full items-center justify-center gap-3">
                        <li>
                            <Link className="cursor-pointer hover:underline">Home</Link>
                        </li>
                        <li>
                            <Link to="/products" className="cursor-pointer hover:underline">Products</Link>
                        </li>
                        <li>
                            <Link to="/addProduct" className="cursor-pointer hover:underline">Add Product</Link>
                        </li>
                    </ul>
                </nav>
            </div>
            <aside className="bg-gray-500 py-5 text-center text-sm text-white dark:bg-gray-800">
                <p>&copy; 2024 ProductPrism. All Rights Reserved.</p>
            </aside>
        </footer>
    );
};

export default Footer;