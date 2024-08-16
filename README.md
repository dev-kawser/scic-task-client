# ProductPrism - Ultimate Product Filtering Project

Welcome to **ProductPrism**! This project is an ultimate product filtering website that allows users to efficiently sort, categorize, and find products based on various criteria. 

## Live Demo
Check out the live version of the project [here](#).

## Features
- **Product Filtering**: Sort products by categories, brand names, and price ranges.
- **Pagination**: Efficiently paginate through products.
- **Responsive Design**: Fully responsive with a mobile-first approach.
- **Stylish UI**: Designed with stylish Tailwind CSS classes for a modern look.
- **Search Functionality**: Easily search for products with the integrated search bar.

## Getting Started

### Prerequisites
Ensure you have the following installed:
- Node.js
- npm or yarn
- React
- Tailwind
- MongoDB
- Express JS

### Installation

Please follow the following steps for successful installation:

1. **Clone the Repository:** Get started by cloning the repository to your local machine.

   ```
   https://github.com/ShaanCoding/makeread.me
   ```

2. **Install Frontend Packages:** Navigate to the &quot;/frontend&quot; directory and install the required yarn packages by executing the following command in your terminal:

   ```sh
   yarn install
   ```

3. **Install Backend Packages:** Similarly, navigate to the &quot;/backend&quot; directory and install the required yarn packages by executing the following command in your terminal:

   ```sh
   yarn install
   ```

4. **Set Up Environment:**

   - In the &quot;/backend&quot; directory, copy the content of &quot;.env.example&quot; file and create a new file named &quot;.env&quot;. Adjust the environment variables according to your requirements or you can leave them as it is.

   - Navigate to &quot;frontend/api/generated/readMeGenerator.ts&quot; and set the BASE parameter to your backend API route. For instance, if you are running backend on your local server at port 8080, you should set:

     ```javascript
     BASE: "http://localhost:5173" or "http://localhost:5174";
     ```
5. **Set Up Firebase:**
   - create a new file named &quot;.env.local&quot;. Adjust the environment variables
- VITE_APIKEY = 
- VITE_AUTHDOMAIN = 
- VITE_PROJETID = 
- VITE_STORAGEBUCKET = 
- VITE_MESSAGINGSENDERID = 
- VITE_APPID = 

7. **Run the Backend:** Navigate to &quot;/backend&quot; directory and type the following command in your terminal to run your backend server:

   ```sh
   yarn dev
   ```

8. **Run the Frontend:** Finally, navigate to &quot;/frontend&quot; directory and type the following command in your terminal to run your frontend server:

   ```sh
   yarn dev
   ```

   Now, your application should be successfully up and running!