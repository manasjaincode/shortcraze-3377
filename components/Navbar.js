import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { HomeIcon, LinkIcon, CogIcon } from '@heroicons/react/24/outline';

const Navbar = ({ onColorChange }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSettingsOpen, setIsMobileSettingsOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const settingsRef = useRef(null);
  const mobileSettingsRef = useRef(null);

  const colors = [
    { name: 'Black', value: 'bg-black text-white' },
    { name: 'Half White', value: 'bg-gray-200' },
    { name: 'Gray', value: 'bg-gray-400' },
    { name: 'Navy Blue', value: 'bg-blue-900' },
    { name: 'White', value: 'bg-white' },
  ];

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const toggleSettings = () => {
    setIsSettingsOpen((prev) => !prev);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const toggleMobileSettings = () => {
    setIsMobileSettingsOpen((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (
      !menuRef.current?.contains(event.target) &&
      !buttonRef.current?.contains(event.target) &&
      !settingsRef.current?.contains(event.target) &&
      !mobileSettingsRef.current?.contains(event.target)
    ) {
      setIsMenuOpen(false);
      setIsSettingsOpen(false);
      setIsMobileMenuOpen(false);
      setIsMobileSettingsOpen(false);
    }
  };

  const handleColorChange = (color) => {
    onColorChange(color);
    setIsSettingsOpen(false);
    setIsMobileSettingsOpen(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 bg-black border-b border-black z-50">
      <div className="container mx-auto p-6 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-2xl text-slate-50 font-bold mr-2 font-sans">SHORT CRAZE</h1>
        </div>

        {/* Regular Navigation Links for Large Screens */}
        <nav className="hidden lg:flex space-x-4">
          <Link href="/" className="flex items-center text-slate-50 hover:bg-gray-500 p-2 rounded">
            <HomeIcon className="w-5 h-5 mr-2" />
            Dashboard
          </Link>
          {/* <Link href="/link-history" className="flex items-center text-slate-50 hover:bg-gray-500 p-2 rounded">
            <LinkIcon className="w-5 h-5 mr-2" />
            Links
          </Link> */}
          <div className="relative">
            <button
              className="flex items-center text-slate-50 hover:bg-gray-500 p-2 rounded"
              onClick={toggleSettings}
            >
              <CogIcon className="w-5 h-5 mr-2" />
              Colors
            </button>
            {isSettingsOpen && (
              <ul
                ref={settingsRef}
                className="absolute right-0 mt-2 bg-white border border-gray-300 rounded shadow-lg w-48 z-10"
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

        {/* Hamburger Icon for Mobile Screens */}
        <button
          ref={buttonRef}
          className="block lg:hidden relative z-20 focus:outline-none"
          onClick={toggleMobileMenu}
        >
          <div className={`w-6 h-6 flex flex-col justify-between items-center transition-transform duration-500 ease-in-out ${isMobileMenuOpen ? 'transform rotate-45' : ''}`}>
            <div className={`bg-slate-50 h-0.5 w-6 transition-transform duration-500 ${isMobileMenuOpen ? 'transform rotate-45 translate-y-1' : ''}`} />
            <div className={`bg-slate-50 h-0.5 w-6 transition-opacity duration-500 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
            <div className={`bg-slate-50 h-0.5 w-6 transition-transform duration-500 ${isMobileMenuOpen ? 'transform -rotate-45 -translate-y-1' : ''}`} />
          </div>
        </button>

        {/* Mobile Menu */}
        <nav
          ref={menuRef}
          className={`absolute top-full right-0 mt-2 w-48 bg-black rounded-md shadow-lg transition-transform duration-500 ease-in-out ${isMobileMenuOpen ? 'transform translate-y-0 opacity-100' : 'transform translate-y-4 opacity-0 pointer-events-none'}`}
        >
          <ul className="flex flex-col p-2">
            <li className="hover:bg-gray-400 text-lg p-2 rounded flex items-center transition-colors duration-200">
              <Link href="/" className="flex items-center text-slate-50">
                <HomeIcon className="w-5 h-5 mr-2" />
                Dashboard
              </Link>
            </li>
            {/* <li className="hover:bg-gray-400 text-lg p-2 rounded flex items-center transition-colors duration-200">
              <Link href="/link-history" className="flex items-center text-slate-50">
                <LinkIcon className="w-5 h-5 mr-2" />
                Links
              </Link> */}
            {/* </li> */}
            <li className="relative hover:bg-gray-400 text-lg p-2 rounded flex items-center transition-colors duration-200">
              <button className="flex items-center text-slate-50" onClick={toggleMobileSettings}>
                <CogIcon className="w-5 h-5 mr-2" />
                Colors
              </button>
              {isMobileSettingsOpen && (
                <ul
                  ref={mobileSettingsRef}
                  className="absolute left-0 mt-2 bg-white border border-gray-300 rounded shadow-lg w-full z-10"
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
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
