// src/pages/links.js

import React from 'react';

// Comment out the getServerSideProps function to avoid build issues
// export async function getServerSideProps() {
//   try {
//     const res = await fetch('http://localhost:3000/api/links/history');
//     const { data } = await res.json();

//     // Ensure data is an array
//     if (!Array.isArray(data)) {
//       return {
//         props: { links: [] }, // Default to an empty array
//       };
//     }

//     return {
//       props: { links: data },
//     };
//   } catch (error) {
//     console.error(error);
//     return {
//       props: { links: [] },
//     };
//   }
// }

const LinksPage = ({ links }) => {
  // Temporary placeholder content until functionality is active
  return (
    <div>
      <h1>Links History - Coming Soon</h1>
      <p>This page will display a list of shortened URLs and their corresponding original URLs. Stay tuned for the feature!</p>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="border px-4 py-2">Original Link</th>
            <th className="border px-4 py-2">Shortened Link</th>
            <th className="border px-4 py-2">Date Created</th>
          </tr>
        </thead>
        <tbody>
          {/* Placeholder rows */}
          <tr>
            <td className="border px-4 py-2">https://example.com</td>
            <td className="border px-4 py-2">short.ly/xyz123</td>
            <td className="border px-4 py-2">{new Date().toLocaleString()}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default LinksPage;
