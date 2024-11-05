// import React, { useEffect } from 'react';

// const QRCodeGenerator = () => {

//   useEffect(() => {
//     const generateQRCode = () => {
//       const qrCodeImg = document.getElementById('qrCodeImg');
//       qrCodeImg.src = `https://api.qrserver.com/v1/create-qr-code/?data=example.com&size=200x200`;
//       qrCodeImg.alt = "Generated QR Code";
//     };

//     const generateQRCodeBtn = document.getElementById('generateQRCodeBtn');
//     generateQRCodeBtn.addEventListener('click', generateQRCode);

//     return () => {
//       generateQRCodeBtn.removeEventListener('click', generateQRCode);
//     };
//   }, []);

//   return (
//     <div className="mt-4">
//       <h3 className="font-semibold">Generate QR Code</h3>
//       <div id="qrCodeContainer" className="bg-white shadow rounded-lg p-4 mt-2">
//         <img id="qrCodeImg" src="https://openui.fly.dev/openui/200x200.svg?text=QR Code" alt="QR Code" />
//       </div>
//       <div className="mt-4 flex justify-between">
//         <button id="generateQRCodeBtn" className="bg-green-400 text-white p-2 rounded">Generate QR Code</button>
//         <a id="downloadQRCodeBtn" href="#" download="QRCode.png" className="bg-green-400 text-white p-2 rounded">Download QR Code</a>
//       </div>
//     </div>
//   );
// }

// export default QRCodeGenerator;
