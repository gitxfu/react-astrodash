
import { Outlet } from "react-router-dom";
import SideNav from "../components/SideNav";

const Layout = () => {
    return (
        <div>
            <SideNav />
            <Outlet />
        </div>   
    );

}
export default Layout;