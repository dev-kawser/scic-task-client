import { Outlet } from "react-router-dom";
import Navbar from "../Shared/Navbar/Navbar";
import { Toaster } from 'react-hot-toast';

const Root = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
        </div>
    );
};

export default Root;