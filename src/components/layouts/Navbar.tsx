import React from "react";
import { FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";

interface INavbar {
  title?: string;
}

const Navbar: React.FC<INavbar> = ({ title = "Github Finder" }) => {
  return (
    <nav className="navbar mb-12 shadow-lg bg-neutral text-neutral-content">
      <div className="container mx-auto">
        <div className="space-x-1">
          <FaGithub className="inline text-3xl"></FaGithub>
          <Link to="/" className="text-xl font-bold align-middle">
            {title}
          </Link>
        </div>
        <div className="flex-1 px-2">
          <div className="flex justify-end">
            <Link to="/" className="btn btn-ghost btn-sm rounded-btn">
              Home
            </Link>
            <Link to="/about" className="btn btn-ghost btn-sm rounded-btn">
              About
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
