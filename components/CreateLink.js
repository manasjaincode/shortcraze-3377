import React, { useState, useRef } from 'react';
import QRCode from 'qrcode.react';

const CreateLink = () => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [customKeyword, setCustomKeyword] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('');
  const [fullUrl, setFullUrl] = useState('');
  const [error, setError] = useState(null);
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

  return (
    <div className="bg-black shadow rounded-lg p-4">
      <h3 className="font-semibold text-white text-lg mb-4">Create Shorten Link</h3>
      <input
        type="text"
        placeholder="Enter your URL"
        className="w-full p-2 border border-zinc-300 rounded mt-2"
        value={originalUrl}
        onChange={(e) => setOriginalUrl(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter custom keyword (optional)"
        className="w-full p-2 border border-zinc-300 rounded mt-2"
        value={customKeyword}
        onChange={(e) => setCustomKeyword(e.target.value)}
      />
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {fullUrl && (
        <div className="mt-4">
          <p className="text-green-400 font-bold">Shortened URL:</p>
          <div className="flex items-center mt-2">
          <input
  type="text"
  readOnly
  value={fullUrl}
  className="w-full p-3 border border-zinc-300 rounded text-sm lg:text-base overflow-auto"
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
        className="mt-2 bg-green-400 text-white p-2 rounded"
        onClick={handleCreateLink}
      >
        Create Link →
      </button>
      {fullUrl && (
        <button
          id="clearAllBtn"
          className="mt-2 bg-red-400 text-white p-2 rounded"
          onClick={handleClearAll}
        >
          Clear All
        </button>
      )}
    </div>
  );
};

export default CreateLink;
