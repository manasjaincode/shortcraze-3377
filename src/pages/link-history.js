import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const LinkHistory = () => {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const response = await fetch('/api/links/history');
        const data = await response.json();
        if (response.ok) {
          setLinks(data);
        } else {
          setError(data.error || 'Failed to fetch links');
        }
      } catch (error) {
        setError('Failed to fetch links');
      } finally {
        setLoading(false);
      }
    };

    fetchLinks();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-800">
      {/* Fixed Navbar */}
      <nav className="bg-gray-900 fixed top-0 left-0 w-full p-4 shadow-md z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-white text-lg font-semibold">Link History</h1>
          <button
            onClick={() => router.push('/')}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
          >
            Go to Dashboard
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-20 flex items-center justify-center"> {/* Added padding to account for fixed navbar */}
        <div className="bg-gray-800 p-4 rounded-lg shadow-md max-w-full mx-auto md:max-w-2xl">
          <h2 className="text-xl font-semibold text-white mb-4 text-center">Link History</h2>
          <ul className="space-y-4">
            {links.map((link) => (
              <li key={link._id} className="bg-gray-700 p-3 rounded-lg">
                <p className="text-white">
                  Original URL: 
                  <a 
                    href={link.originalUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-blue-400"
                    style={{ wordBreak: 'break-word' }}
                  >
                    {link.originalUrl}
                  </a>
                </p>
                <p className="text-white mt-2">
                  Shortened URL: 
                  <a 
                    href={`/${link.shortenedUrl}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-blue-400"
                    style={{ wordBreak: 'break-word' }}
                  >
                    http://localhost:3000/{link.shortenedUrl}
                  </a>
                </p>
                <p className="text-gray-400 mt-2 text-sm">Created on: {new Date(link.date).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LinkHistory;
