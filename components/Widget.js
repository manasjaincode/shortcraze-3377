import React, { useState } from 'react';
import Navbar from './Navbar';
import CreateLink from './CreateLink';
import PerformanceChart from './PerformanceChart';
import Footer from './Footer';

const Widget = () => {
  const [bgColor, setBgColor] = useState('bg-black');

  const handleColorChange = (color) => {
    setBgColor(color);
  };

  return (
    <div className={`pt-20 lg:pt-16 ${bgColor}`}>
      <Navbar onColorChange={handleColorChange} />
      <main className="p-4 md:p-6">
        <div className="mt-4 md:mt-6 grid grid-cols-1 gap-4">
          <div className="bg-black shadow rounded-lg p-4">
            <h3 className="font-semibold">Total Links</h3>
            <div className="h-64 md:h-96">
              <PerformanceChart selectedRange="day" />
            </div>
          </div>
          
          <CreateLink />
          {/* <QRCodeGenerator/>
           */}
      
        </div>
      </main>
      <Footer/>
    </div>
  );
};

export default Widget;
