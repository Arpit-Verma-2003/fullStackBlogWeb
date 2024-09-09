import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 ">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl font-bold">BlogPost</h2>
          </div>
          <div className="flex space-x-4">
            <Link to="/" className="hover:underline">Home</Link>
            <Link to="/about" className="hover:underline">About</Link>
            <Link to="/privacy-policy" className="hover:underline">Privacy Policy</Link>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-gray-700 pt-4">
          <div className="flex space-x-4 mb-4 md:mb-0">
            <a href="https://twitter.com" className="hover:text-gray-400">Twitter</a>
            <a href="https://facebook.com" className="hover:text-gray-400">Facebook</a>
            <a href="https://instagram.com" className="hover:text-gray-400">Instagram</a>
          </div>
          <p className="text-sm text-gray-400">© 2024 BlogPost. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
