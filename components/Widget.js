import React, { useState } from "react";
import Navbar from "./Navbar";
import CreateLink from "./CreateLink";
import PerformanceChart from "./PerformanceChart";
import Footer from "./Footer";

const Widget = () => {
  const [bgColor, setBgColor] = useState("bg-black"); // Initial background color

  // Function to update the background color
  const handleColorChange = (color) => {
    setBgColor(color);
  };

  return (
    <div className={`min-h-screen pt-20 lg:pt-16 ${bgColor} text-white`}>
      {/* Pass the handleColorChange function to the Navbar */}
      <Navbar onColorChange={handleColorChange} />
      
      <main className="p-4 md:p-6">
        <div className="mt-4 md:mt-6 grid grid-cols-1 gap-4">
          {/* Performance Chart Section */}
          <div
            className={`shadow rounded-lg p-4 ${
              bgColor === "bg-black" ? "bg-gray-800" : "bg-gray-200"
            }`}
          >
            <h3 className="font-semibold">
              Total Links
            </h3>
            <div className="h-64 md:h-96">
              <PerformanceChart selectedRange="day" bgColor={bgColor} />
            </div>
          </div>

          {/* Create Link Section */}
          <CreateLink bgColor={bgColor} />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Widget;
