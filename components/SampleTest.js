// import React, { useEffect, useRef } from 'react';
// import Chart from 'chart.js/auto';

// export default function Widget() {
//   const chartRef = useRef(null);

//   useEffect(() => {
//     const ctx = document.getElementById('performanceChart').getContext('2d');
    
//     // Check if a chart instance exists and destroy it
//     if (chartRef.current) {
//       chartRef.current.destroy();
//     }

//     // Create new chart instance
//     chartRef.current = new Chart(ctx, {
//       type: 'bar',
//       data: {
//         labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
//         datasets: [{
//           label: 'Total Clicks',
//           data: [400, 450, 300, 500, 600, 400, 700, 600, 500, 400, 300, 200],
//           backgroundColor: 'rgba(0, 123, 255, 0.6)',
//         }]
//       },
//       options: {
//         scales: {
//           y: {
//             beginAtZero: true
//           }
//         }
//       }
//     });

//     const timePeriodBtn = document.getElementById('timePeriodBtn');
//     const timePeriodDropdown = document.getElementById('timePeriodDropdown');
//     timePeriodBtn.addEventListener('click', () => {
//       timePeriodDropdown.classList.toggle('hidden');
//     });

//     const createLinkBtn = document.getElementById('createLinkBtn');
//     createLinkBtn.addEventListener('click', () => {
//       // Logic to create a new link goes here
//     });

//     const generateQRCode = () => {
//       const qrCodeImg = document.getElementById('qrCodeImg');
//       qrCodeImg.src = `https://api.qrserver.com/v1/create-qr-code/?data=example.com&size=200x200`;
//       qrCodeImg.alt = "Generated QR Code";
//     };

//     const generateQRCodeBtn = document.getElementById('generateQRCodeBtn');
//     generateQRCodeBtn.addEventListener('click', generateQRCode);

//     return () => {
//       // Clean up chart instance and event listeners
//       if (chartRef.current) {
//         chartRef.current.destroy();
//       }
//       timePeriodBtn.removeEventListener('click', () => {
//         timePeriodDropdown.classList.toggle('hidden');
//       });
//       createLinkBtn.removeEventListener('click', () => {});
//       generateQRCodeBtn.removeEventListener('click', generateQRCode);
//     };
//   }, []);

//   return (
//     <div className="flex">
//       <aside className="w-64 bg-white border-r border-zinc-200">
//         <div className="p-4">
//           <h1 className="text-xl font-bold">SHORTIE</h1>
//         </div>
//         <nav className="mt-4">
//           <ul>
//             <li className="p-2 hover:bg-zinc-100">
//               <a href="#" className="text-blue-600">Dashboard</a>
//             </li>
//             <li className="p-2 hover:bg-zinc-100">
//               <a href="#" className="text-blue-600">Links</a>
//             </li>
//             <li className="p-2 hover:bg-zinc-100">
//               <a href="#" className="text-blue-600">Microsite</a>
//             </li>
//             <li className="p-2 hover:bg-zinc-100">
//               <a href="#" className="text-blue-600">Campaigns</a>
//             </li>
//             <li className="p-2 hover:bg-zinc-100">
//               <a href="#" className="text-blue-600">Custom Link</a>
//             </li>
//             <li className="p-2 hover:bg-zinc-100">
//               <a href="#" className="text-blue-600">Setting</a>
//             </li>
//           </ul>
//         </nav>
//       </aside>
      
//       <main className="flex-1 p-6 bg-zinc-50">
//         <div className="bg-white shadow rounded-lg p-4">
//           <h3 className="font-semibold">Create New Link</h3>
//           <input type="text" placeholder="Enter your URL" className="w-full p-2 border border-zinc-300 rounded mt-2" />
//           <button id="createLinkBtn" className="mt-2 bg-blue-600 text-white p-2 rounded">Create Link →</button>
//         </div>
        
//         <h2 className="text-2xl font-semibold mt-6">URL Shortener</h2>
//         <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          
//           <div className="bg-white shadow rounded-lg p-4">
//             <h3 className="font-semibold flex justify-between items-center">Total Clicks
//               <div className="relative">
//                 <button id="timePeriodBtn" className="ml-2 bg-blue-600 text-white p-2 rounded">Day</button>
//                 <ul id="timePeriodDropdown" className="hidden absolute z-10 bg-white border border-zinc-200 rounded mt-2">
//                   <li className="p-2 hover:bg-zinc-100">Day</li>
//                   <li className="p-2 hover:bg-zinc-100">Yesterday</li>
//                   <li className="p-2 hover:bg-zinc-100">1 Month</li>
//                   <li className="p-2 hover:bg-zinc-100">6 Months</li>
//                   <li className="p-2 hover:bg-zinc-100">1 Year</li>
//                 </ul>
//               </div>
//             </h3>
//             <div className="flex justify-between items-center mt-2">
//               <span>Total Clicks</span>
//               <span className="text-blue-600 text-lg">2,280</span>
//             </div>
//             <div className="mt-4">
//               <canvas id="performanceChart"></canvas>
//             </div>
//           </div>
          
//           <div className="bg-white shadow rounded-lg p-4">
//             <h3 className="font-semibold">Create Custom Link</h3>
//             <input type="text" placeholder="Enter custom link" className="w-full p-2 border border-zinc-300 rounded mt-2" />
            
//             <div className="mt-4">
//               <h3 className="font-semibold">Generate QR Code</h3>
//               <div id="qrCodeContainer" className="bg-white shadow rounded-lg p-4 mt-2">
//                 <img id="qrCodeImg" src="https://openui.fly.dev/openui/200x200.svg?text=QR Code" alt="QR Code" />
//               </div>
//               <div className="mt-4 flex justify-between">
//                 <button id="generateQRCodeBtn" className="bg-blue-600 text-white p-2 rounded">Generate QR Code</button>
//                 <a id="downloadQRCodeBtn" href="#" download="QRCode.png" className="bg-blue-600 text-white p-2 rounded">Download QR Code</a>
//               </div>
//             </div>
//           </div>
//         </div>
        
//         <div className="mt-6">
//           <h3 className="font-semibold">Engagement All Time</h3>
//           <div className="bg-white shadow rounded-lg p-4 mt-2">
//             <p>short.link/InvoiceLandingPage</p>
//             <p className="text-zinc-500">2 Result</p>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }
