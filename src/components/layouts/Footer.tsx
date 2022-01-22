import React from "react";
import { FaHashtag } from "react-icons/fa";
const footerYear = new Date().getFullYear();

const Footer = () => {
  return (
    <footer className="footer p-10 bg-gray-700 text-primary-content footer-center">
      <div>
        <FaHashtag className="text-3xl rotate-[20deg]" />
        <p>Copyright &copy; {footerYear} All rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
