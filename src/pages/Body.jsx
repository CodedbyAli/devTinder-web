import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Body = () => {
    return(
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    )
}

export default Body;