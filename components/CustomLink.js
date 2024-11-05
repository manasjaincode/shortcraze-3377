// import React, { useState } from 'react';
// import QRCodeGenerator from './QRCodeGenerator';

// const CreateLink = () => {
//   const [originalUrl, setOriginalUrl] = useState('');
//   const [shortenedUrl, setShortenedUrl] = useState('');
//   const [error, setError] = useState(null);

//   const handleCreateLink = async () => {
//     if (!originalUrl) {
//       setError('Please enter a valid URL');
//       return;
//     }
//     setError(null);

//     try {
//       const response = await fetch('/api/links/create', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ originalUrl }),
//       });
//       const data = await response.json();
//       if (response.ok) {
//         setShortenedUrl(data.shortenedUrl);
//       } else {
//         setError(data.error || 'Failed to create link');
//       }
//     } catch (error) {
//       setError('Failed to create link');
//     }
//   };

//   return (
//     <div className="bg-white shadow rounded-lg p-4">
//       <h3 className="font-semibold">Create Shortened Link</h3>
//       <input
//         type="text"
//         placeholder="Enter your URL"
//         className="w-full p-2 border border-zinc-300 rounded mt-2"
//         value={originalUrl}
//         onChange={(e) => setOriginalUrl(e.target.value)}
//       />
//       {error && <p className="text-red-500 mt-2">{error}</p>}
//       {shortenedUrl && (
//         <div className="mt-4">
//           <p className="text-green-600">Shortened URL:</p>
//           <input
//             type="text"
//             readOnly
//             value={shortenedUrl}
//             className="w-full p-2 border border-zinc-300 rounded"
//           />
//           <QRCodeGenerator url={shortenedUrl} />
//         </div>
//       )}
//       <button
//         onClick={handleCreateLink}
//         className="mt-2 bg-green-400 text-white p-2 rounded"
//       >
//         Create Link →
//       </button>
//     </div>
//   );
// };

// export default CreateLink;
