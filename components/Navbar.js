import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { HomeIcon, CogIcon } from '@heroicons/react/24/outline';

const Navbar = ({ onColorChange }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const settingsRef = useRef(null);
  const mobileSettingsRef = useRef(null);



  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const toggleSettings = () => setIsSettingsOpen((prev) => !prev);

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  const handleClickOutside = (event) => {
    if (
      !menuRef.current?.contains(event.target) &&
      !settingsRef.current?.contains(event.target) &&
      !mobileSettingsRef.current?.contains(event.target)
    ) {
      setIsMenuOpen(false);
      setIsSettingsOpen(false);
      setIsMobileMenuOpen(false);
    }
  };

  const handleColorChange = (color) => {
    onColorChange(color);
    setIsSettingsOpen(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 bg-black z-50 shadow-md">
      <div className="container mx-auto p-6 flex justify-between items-center">
        {/* Brand */}
        <div className="text-white font-bold text-lg">ShortCraze🔗</div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex space-x-4">
          <Link href="/" className="flex items-center text-white hover:bg-gray-700 p-2 rounded">
            <HomeIcon className="w-5 h-5 mr-2" />
            Dashboard
          </Link>
          <div className="relative">
           
            {isSettingsOpen && (
              <ul
                ref={settingsRef}
                className="absolute right-0 mt-2 bg-white border border-gray-300 rounded shadow-lg w-48 z-10 max-h-60 overflow-y-auto"
              >
                {colors.map((color) => (
                  <li
                    key={color.value}
                    className={`p-2 hover:bg-gray-100 cursor-pointer ${color.value}`}
                    onClick={() => handleColorChange(color.value)}
                  >
                    {color.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="lg:hidden text-white focus:outline-none"
          onClick={toggleMobileMenu}
        >
          <div className="w-6 h-6 flex flex-col justify-between">
            <span className="block w-6 h-1 bg-white transform transition-transform"></span>
            <span className="block w-6 h-1 bg-white transform transition-transform"></span>
            <span className="block w-6 h-1 bg-white transform transition-transform"></span>
          </div>
        </button>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <nav
            ref={menuRef}
            className="absolute top-full left-0 w-full bg-black text-white shadow-lg z-20"
          >
            <ul className="flex flex-col p-4">
              <li>
                <Link
                  href="/"
                  className="flex items-center p-2 hover:bg-gray-700 rounded"
                >
                  <HomeIcon className="w-5 h-5 mr-2" />
                  Dashboard
                </Link>
              </li>
              <li>
               
                {isSettingsOpen && (
                  <ul
                    ref={mobileSettingsRef}
                    className="bg-white text-black rounded shadow-lg p-4 mt-2"
                  >
                    {colors.map((color) => (
                      <li
                        key={color.value}
                        className={`p-2 hover:bg-gray-300 cursor-pointer ${color.value}`}
                        onClick={() => handleColorChange(color.value)}
                      >
                        {color.name}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;
