import React, { useState, useEffect } from 'react';

const LinkHistory = () => {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    <div className="bg-gray-800 p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-white mb-4">Link History</h2>
      <ul>
        {links.map((link) => (
          <li key={link._id} className="bg-gray-700 p-3 mb-2 rounded">
            <p className="text-white">Original URL: <a href={link.originalUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400">{link.originalUrl}</a></p>
            <p className="text-white">Shortened URL: <a href={`/${link.shortenedUrl}`} target="_blank" rel="noopener noreferrer" className="text-blue-400">http://localhost:3000/{link.shortenedUrl}</a></p>
            <p className="text-gray-400">Created on: {new Date(link.date).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LinkHistory;
