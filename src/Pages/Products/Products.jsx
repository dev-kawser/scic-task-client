import { useEffect, useState } from 'react';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOption, setSortOption] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');

    const fetchProducts = async () => {
        const response = await fetch(`http://localhost:5000/products?page=${currentPage}&limit=10`);
        const data = await response.json();
        setProducts(data.products);
        setTotalPages(data.totalPages);
    };

    useEffect(() => {
        fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage]);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSort = (event) => {
        setSortOption(event.target.value);
    };

    const handleCategoryFilter = (event) => {
        setCategoryFilter(event.target.value);
    };

    const filteredProducts = products
        .filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
        .filter(product => !categoryFilter || product.category === categoryFilter)
        .sort((a, b) => {
            if (sortOption === 'price-asc') return a.price - b.price;
            if (sortOption === 'price-desc') return b.price - a.price;
            if (sortOption === 'date-newest') return new Date(b.dateAdded) - new Date(a.dateAdded);
            return 0;
        });

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4">
            <div className="max-w-7xl mx-auto bg-white p-6 rounded-lg shadow-md mb-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={handleSearch}
                        className="w-full sm:w-1/3 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <select value={sortOption} onChange={handleSort} className="w-full sm:w-1/4 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                        <option value="">Sort By</option>
                        <option value="price-asc">Price: Low to High</option>
                        <option value="price-desc">Price: High to Low</option>
                        <option value="date-newest">Newest First</option>
                    </select>
                    <select value={categoryFilter} onChange={handleCategoryFilter} className="w-full sm:w-1/4 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                        <option value="">Filter by Category</option>
                        <option value="category1">Category 1</option>
                        <option value="category2">Category 2</option>
                        {/* Add more categories as needed */}
                    </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map(product => (
                        <div key={product._id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                            <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                            <p className="text-gray-700 mb-2">Price: <span className="font-bold">${product.price.toFixed(2)}</span></p>
                            <p className="text-gray-600 mb-2">Category: {product.category}</p>
                            <p className="text-gray-500">Date Added: {new Date(product.dateAdded).toLocaleDateString()}</p>
                        </div>
                    ))}
                </div>

                <div className="flex justify-between items-center mt-8">
                    <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(currentPage - 1)}
                        className="px-4 py-2 bg-indigo-500 text-white rounded-lg shadow-md hover:bg-indigo-600 disabled:opacity-50 transition-colors duration-300"
                    >
                        Prev
                    </button>
                    <span className="text-gray-700">Page {currentPage} of {totalPages}</span>
                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(currentPage + 1)}
                        className="px-4 py-2 bg-indigo-500 text-white rounded-lg shadow-md hover:bg-indigo-600 disabled:opacity-50 transition-colors duration-300"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Products;
