import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUser } from "@fortawesome/free-solid-svg-icons";

const Header = ({ setIsSidebarOpen }) => {
  return (
    <header className="dashboard-header px-2 py-4 flex items-center gap-4 bg-(--secondary-color)">
      <button
        className="flex justify-center items-end cursor-pointer md:hidden"
        onClick={() => setIsSidebarOpen((prev) => !prev)}
        aria-label="Toggle Sidebar"
      >
        <FontAwesomeIcon icon={faBars} />
      </button>
      <Link to="/" className="md:ml-12">
        <h1>
          <span className="text-(--hero-color)">Dash</span>Stack
        </h1>
      </Link>
      <div className="grow flex items-center justify-around">
        <input
          type="search"
          name="search"
          id="search"
          placeholder="Search"
          className="px-4 py-2 bg-gray-700 rounded-full w-40 sm:w-1/2 md:w-1/3 focus:outline-2 focus:outline-(--hero-color)"
        />
        <div className="profile flex gap-6">
          <select
            name="lang"
            id="lang"
            className="hidden md:block bg-(--secondary-color)"
          >
            <option value="english">English</option>
            <option value="arabic">Arabic</option>
            <option value="french">French</option>
            <option value="dutch">Dutch</option>
          </select>
          <button className="cursor-pointer" aria-label="Go to User page">
            <FontAwesomeIcon icon={faUser} />
          </button>
        </div>
      </div>
    </header>
  );
};
export default Header;
