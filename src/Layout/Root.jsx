import { Outlet } from "react-router-dom";
import Navbar from "../Shared/Navbar/Navbar";
import { Toaster } from 'react-hot-toast';
import Footer from "../Shared/Footer/Footer";

const Root = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
        </div>
    );
};

export default Root;