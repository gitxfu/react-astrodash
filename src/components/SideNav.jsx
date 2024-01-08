
import { Link } from "react-router-dom";

const SideNav = () => {
    return (
        <div className="App-sidebar">
            <div className="Header">
                <img className="Logo" alt="cresent moon logo" src="https://img.icons8.com/fluency/344/full-moon.png" />
                <h2 className="Header-title">AstroDash</h2>
            </div>
            <div className="Menu">
                <ul>
                    <li className="Menu-item">
                        <Link to="/"> 🏠 Dashboard </Link>
                    </li>

                    <li className="Menu-item">
                        <Link to="/about"> 💡 About </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default SideNav;