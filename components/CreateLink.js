import React, { useState, useRef } from 'react';
import QRCode from 'qrcode.react';

const CreateLink = ({ bgColor }) => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [customKeyword, setCustomKeyword] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('');
  const [fullUrl, setFullUrl] = useState('');
  const [error, setError] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(true); // Default is dark mode

  const qrCodeRef = useRef();

  const handleCreateLink = async () => {
    if (!originalUrl) {
      setError('Please enter a valid URL');
      return;
    }
    setError(null);

    try {
      const response = await fetch('/api/links/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ originalUrl, customKeyword }),
      });
      const data = await response.json();
      if (response.ok) {
        const fullShortenedUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/${data.shortenedUrl}`;
        setShortenedUrl(data.shortenedUrl);
        setFullUrl(fullShortenedUrl);
      } else {
        setError(data.error || 'Failed to create link');
      }
    } catch (error) {
      setError('Failed to create link');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(fullUrl)
      .then(() => alert('URL copied to clipboard'))
      .catch(() => alert('Failed to copy URL'));
  };

  const handleDownloadQR = () => {
    if (qrCodeRef.current) {
      const qrCodeCanvas = qrCodeRef.current.querySelector('canvas');
      const qrCodeUrl = qrCodeCanvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.href = qrCodeUrl;
      downloadLink.download = `${shortenedUrl}_QRCode.png`;
      downloadLink.click();
    }
  };

  const handleClearAll = () => {
    setOriginalUrl('');
    setCustomKeyword('');
    setShortenedUrl('');
    setFullUrl('');
    setError(null);
  };

  const handleToggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode); // Toggle dark mode
  };

  return (
    <div
      className={`p-4 rounded shadow ${
        isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'
      }`}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-lg">Create Shorten Link</h3>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={isDarkMode}
            onChange={handleToggleDarkMode}
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:bg-green-600"></div>
          <span className="absolute left-1 top-1 w-4 h-4 bg-white border border-gray-300 rounded-full transition-transform peer-checked:translate-x-5 peer-checked:border-white"></span>
        </label>
      </div>

      <input
        type="text"
        placeholder="Enter your URL"
        className={`w-full p-2 rounded mt-2 ${
          isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'
        }`}
        value={originalUrl}
        onChange={(e) => setOriginalUrl(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter custom keyword (optional)"
        className={`w-full p-2 rounded mt-2 ${
          isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'
        }`}
        value={customKeyword}
        onChange={(e) => setCustomKeyword(e.target.value)}
      />
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {fullUrl && (
        <div className="mt-4">
          <p className="font-bold text-green-400">Shortened URL:</p>
          <div className="flex items-center mt-2">
            <input
              type="text"
              readOnly
              value={fullUrl}
              className={`w-full p-3 rounded text-sm lg:text-base overflow-auto ${
                isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'
              }`}
            />
            <button
              onClick={handleCopy}
              className="ml-2 bg-blue-500 text-white p-2 rounded"
            >
              Copy
            </button>
          </div>
          <div className="mt-4">
            <p className="text-green-600">QR Code:</p>
            <div ref={qrCodeRef}>
              <QRCode value={fullUrl} size={150} />
            </div>
            <button
              onClick={handleDownloadQR}
              className="mt-2 bg-blue-500 text-white p-2 rounded"
            >
              Download QR
            </button>
          </div>
        </div>
      )}
      <button
        id="createLinkBtn"
        className="mt-2 py-2 px-4 rounded bg-green-400 text-white"
        onClick={handleCreateLink}
      >
        Create Link →
      </button>
      {fullUrl && (
        <button
          id="clearAllBtn"
          className="mt-2 py-2 px-4 rounded bg-red-400 text-white"
          onClick={handleClearAll}
        >
          Clear All
        </button>
      )}
    </div>
  );
};

export default CreateLink;
