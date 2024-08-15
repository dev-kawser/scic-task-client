import { useEffect, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, RefreshIcon, FilterIcon, XIcon } from '@heroicons/react/solid';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOption, setSortOption] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [brandFilter, setBrandFilter] = useState('');
    const [priceRangeFilter, setPriceRangeFilter] = useState('');
    const [showFilters, setShowFilters] = useState({
        category: false,
        brand: false,
        price: false,
    });

    const fetchProducts = async () => {
        const response = await fetch(`http://localhost:5000/products?page=${currentPage}&limit=10`);
        const data = await response.json();
        setProducts(data.products);
        setAllProducts(data.products); // Save all products to reset later
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

    const handleFilterToggle = (filter) => {
        setShowFilters(prev => ({ ...prev, [filter]: !prev[filter] }));
    };

    const handleCategoryFilter = (event) => {
        setCategoryFilter(event.target.value);
        setShowFilters(prev => ({ ...prev, category: false }));
    };

    const handleBrandFilter = (event) => {
        setBrandFilter(event.target.value);
        setShowFilters(prev => ({ ...prev, brand: false }));
    };

    const handlePriceRangeFilter = (range) => {
        setPriceRangeFilter(range);
        setShowFilters(prev => ({ ...prev, price: false }));
    };

    const resetFilters = () => {
        setSearchTerm('');
        setCategoryFilter('');
        setBrandFilter('');
        setPriceRangeFilter('');
        setShowFilters({
            category: false,
            brand: false,
            price: false,
        });
        fetchProducts(); // Fetch all products again
    };

    const filteredProducts = allProducts
        .filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
        .filter(product => !categoryFilter || product.category === categoryFilter)
        .filter(product => !brandFilter || product.brand === brandFilter)
        .filter(product => {
            if (!priceRangeFilter) return true;
            const [min, max] = priceRangeFilter.split('-').map(Number);
            return product.price >= min && product.price <= max;
        })
        .sort((a, b) => {
            if (sortOption === 'price-asc') return a.price - b.price;
            if (sortOption === 'price-desc') return b.price - a.price;
            if (sortOption === 'date-newest') return new Date(b.dateAdded) - new Date(a.dateAdded);
            return 0;
        });

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-7xl mx-auto bg-white p-6 rounded-lg shadow-xl mb-8 relative">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                    <div className="relative w-full sm:w-1/3">
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={handleSearch}
                            className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 bg-gray-100"
                        />
                        <FilterIcon className="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-500" />
                    </div>
                    <select
                        value={sortOption}
                        onChange={handleSort}
                        className="w-full sm:w-1/4 p-4 border border-gray-300 rounded-lg shadow-sm bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    >
                        <option value="">Sort By</option>
                        <option value="price-asc">Price: Low to High</option>
                        <option value="price-desc">Price: High to Low</option>
                        <option value="date-newest">Newest First</option>
                    </select>
                    <div className="relative w-full sm:w-1/4">
                        <button
                            onClick={() => handleFilterToggle('category')}
                            className="w-full p-4 border border-gray-300 rounded-lg shadow-sm bg-gray-100 text-gray-700 flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-indigo-600"
                        >
                            <span>Categorization</span>
                            <FilterIcon className="w-6 h-6 text-gray-600" />
                        </button>
                        {showFilters.category && (
                            <div className="absolute left-0 mt-2 bg-white p-6 border border-gray-300 rounded-lg shadow-lg w-full z-10">
                                <div className="mb-4">
                                    <h3 className="text-lg font-semibold mb-2">Category Name</h3>
                                    <select onChange={handleCategoryFilter} className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50">
                                        <option value="">Select Category</option>
                                        <option value="category1">Category 1</option>
                                        <option value="category2">Category 2</option>
                                        {/* Add more categories as needed */}
                                    </select>
                                </div>
                                <div className="mb-4">
                                    <h3 className="text-lg font-semibold mb-2">Brand Name</h3>
                                    <select onChange={handleBrandFilter} className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50">
                                        <option value="">Select Brand</option>
                                        <option value="brand1">Brand 1</option>
                                        <option value="brand2">Brand 2</option>
                                        {/* Add more brands as needed */}
                                    </select>
                                </div>
                                <div className="mb-4">
                                    <h3 className="text-lg font-semibold mb-2">Price Range</h3>
                                    <select onChange={(e) => handlePriceRangeFilter(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50">
                                        <option value="">Select Price Range</option>
                                        <option value="1-10">$1-10</option>
                                        <option value="10-20">$10-20</option>
                                        <option value="20-30">$20-30</option>
                                        <option value="30-40">$30-40</option>
                                        <option value="40-50">$40-50</option>
                                        <option value="50-60">$50-60</option>
                                        <option value="60-70">$60-70</option>
                                        <option value="70-80">$70-80</option>
                                        <option value="80-90">$80-90</option>
                                        <option value="90-100">$90-100</option>
                                    </select>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex mb-6">
                    <button
                        onClick={resetFilters}
                        className="px-6 py-3 bg-red-600 text-white rounded-lg shadow-md flex items-center space-x-2 hover:bg-red-700 transition-colors duration-300"
                    >
                        <RefreshIcon className="w-5 h-5" />
                        <span>Reset Filters</span>
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProducts.map(product => (
                        <div key={product._id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
                            <img src={product.image} alt={product.name} className="w-full h-56 object-cover rounded-t-lg mb-4 border border-gray-200" />
                            <h3 className="text-xl font-semibold mb-2 text-gray-900">{product.name}</h3>
                            <p className="text-gray-700 mb-3 line-clamp-3">{product.description}</p>
                            <div className="flex items-center mb-2">
                                <span className="text-yellow-400 flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                        <svg
                                            key={i}
                                            xmlns="http://www.w3.org/2000/svg"
                                            className={`w-5 h-5 ${i < Math.round(product.ratings) ? 'text-yellow-400' : 'text-gray-300'}`}
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                        </svg>
                                    ))}
                                </span>
                                <span className="ml-2 text-gray-600">({product.ratings.toFixed(1)})</span>
                            </div>
                            <p className="text-gray-900 font-semibold mb-2">Price: ${product.price.toFixed(2)}</p>
                            <p className="text-gray-600 text-sm mb-1">Category: {product.category}</p>
                            <p className="text-gray-400 text-xs">Date Added: {new Date(product.dateAdded).toLocaleDateString()}</p>
                        </div>
                    ))}
                </div>

                <div className="flex justify-between items-center mt-8">
                    <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(currentPage - 1)}
                        className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-md flex items-center space-x-2 hover:bg-indigo-700 disabled:opacity-50 transition-colors duration-300"
                    >
                        <ChevronLeftIcon className="w-5 h-5" />
                        <span>Prev</span>
                    </button>
                    <span className="text-gray-700 font-medium">Page {currentPage} of {totalPages}</span>
                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(currentPage + 1)}
                        className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-md flex items-center space-x-2 hover:bg-indigo-700 disabled:opacity-50 transition-colors duration-300"
                    >
                        <ChevronRightIcon className="w-5 h-5" />
                        <span>Next</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Products;
