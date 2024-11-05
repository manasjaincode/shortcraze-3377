import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-black border-t border-slate-700 py-6">
      <div className="container mx-auto flex flex-col items-center text-center">
        <p className="text-slate-50 text-lg font-semibold mb-4">
          Developed by - <span className="font-bold">MANAS JAIN</span>
        </p>
        <div className="flex space-x-6">
          <a
            href="https://www.instagram.com/manas.tsx/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-50 hover:text-gray-400"
          >
            <FontAwesomeIcon icon={faInstagram} className="w-8 h-8" />
          </a>
          <a
            href="https://www.linkedin.com/in/manas-jain-171620257/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-50 hover:text-gray-400"
          >
            <FontAwesomeIcon icon={faLinkedin} className="w-8 h-8" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
