// src/pages/links.js

import React from 'react';

export async function getServerSideProps() {
  try {
    const res = await fetch('http://localhost:3000/api/links/history');
    const { data } = await res.json();

    // Ensure data is an array
    if (!Array.isArray(data)) {
      return {
        props: { links: [] }, // Default to an empty array
      };
    }

    return {
      props: { links: data },
    };
  } catch (error) {
    console.error(error);
    return {
      props: { links: [] },
    };
  }
}

const LinksPage = ({ links }) => {
  if (!Array.isArray(links)) {
    return <p>No links available</p>;
  }

  return (
    <div>
      <h1>Links History</h1>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>+-+--
          <tr>
            <th className="border px-4 py-2">Original Link</th>
            <th className="border px-4 py-2">Shortened Link</th>
            <th className="border px-4 py-2">Date Created</th>
          </tr>
        </thead>
        <tbody>
          {links.map((link) => (
            <tr key={link._id}>
              <td className="border px-4 py-2">
                <a href={link.originalUrl} target="_blank" rel="noopener noreferrer">
                  {link.originalUrl}
                </a>
              </td>
              <td className="border px-4 py-2">
                <a href={`http://localhost:3000/${link.shortenedUrl}`} target="_blank" rel="noopener noreferrer">
                  {link.shortenedUrl}
                </a>
              </td>
              <td className="border px-4 py-2">{new Date(link.date).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LinksPage;
