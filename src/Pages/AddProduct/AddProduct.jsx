import axios from 'axios';
import toast from 'react-hot-toast';

const AddProduct = () => {
  const categories = [
    'Electronics',
    'Clothing',
    'Home Appliances',
    'Books',
    'Toys',
    'Furniture',
    'Beauty & Personal Care',
    'Sports & Outdoors',
    'Automotive',
    'Food & Beverages'
  ];

  const brands = [
    'Apple',
    'Nike',
    'Samsung',
    'Sony',
    'LG',
    'Adidas',
    'Canon',
    'Dell',
    'Microsoft',
    'Bosch'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name: e.target.name.value,
      image: e.target.image.value,
      description: e.target.description.value,
      price: parseFloat(e.target.price.value),
      category: e.target.category.value,
      brand: e.target.brand.value,
      ratings: parseFloat(e.target.ratings.value),
      createdAt: new Date().toISOString().split('T')[0],
    };

    try {
      await axios.post('http://localhost:5000/products', formData);
      toast.success('Product added successfully!');
      e.target.reset();
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-700">Product Name</label>
          <input
            type="text"
            name="name"
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700">Product Image URL</label>
          <input
            type="text"
            name="image"
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700">Description</label>
          <textarea
            name="description"
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700">Price</label>
          <input
            type="number"
            name="price"
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700">Category</label>
          <select
            name="category"
            required
            className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a category</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-gray-700">Brand</label>
          <select
            name="brand"
            required
            className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a brand</option>
            {brands.map(brand => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-gray-700">Ratings</label>
          <input
            type="number"
            name="ratings"
            step="0.1"
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
