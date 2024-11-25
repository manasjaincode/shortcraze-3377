import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

const PerformanceChart = ({ selectedRange }) => {
  const chartRef = useRef(null); // Reference for the chart instance
  const canvasRef = useRef(null); // Reference for the canvas element
  const [chartData, setChartData] = useState({ labels: [], values: [] });
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/links/stats'); // Fetching stats data
        const data = await response.json();

        // Filter out the 'week' section
        const filteredData = Object.entries(data).filter(([key]) => key.toLowerCase() !== 'week');

        const newChartData = {
          labels: filteredData.map(([key]) => key), // Use only the filtered keys
          values: filteredData.map(([, value]) => value), // Use only the filtered values
        };

        setChartData(newChartData);
      } catch (error) {
        console.error('Error fetching chart data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedRange]);

  useEffect(() => {
    if (!chartData.values.length || !canvasRef.current) return;

    const ctx = canvasRef.current.getContext('2d');

    // Destroy previous chart instance
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    // Create new line chart
    chartRef.current = new Chart(ctx, {
      type: 'line', // Change the chart type to 'line'
      data: {
        labels: chartData.labels,
        datasets: [
          {
            label: 'Links Created Over Time',
            data: chartData.values,
            borderColor: 'green', // Line color
            backgroundColor: 'rgba(144, 238, 144, 0.2)', // Light fill under the line
            pointBackgroundColor: 'pink', // Point color
            borderWidth: 2, // Line thickness
            fill: true, // Fills the area under the line
            tension: 0.5, // Smooth curve
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            grid: {
              display: false, // Removes grid lines for x-axis
            },
            title: {
              display: true,
              text: 'Time Periods', // X-axis label
              font: {
                size: 14,
                weight: 'bold',
                color: 'pink', // X-axis label color
              },
            },
            ticks: {
              color: 'white', // X-axis tick labels color
            },
          },
          y: {
            beginAtZero: true,
            grid: {
              color: '#e0e0e0', // Light grey grid lines for y-axis
            },
            title: {
              display: true,
              text: 'Count of Links Created', // Y-axis label
              font: {
                size: 14,
                weight: 'bold',
                color: 'pink', // Y-axis label color
              },
            },
            ticks: {
              color: 'white', // Y-axis tick labels color
            },
          },
        },
        plugins: {
          legend: {
            display: true, // Display legend for line chart
            labels: {
              color: 'white', // Legend text color
            },
          },
          tooltip: {
            callbacks: {
              label: function (tooltipItem) {
                return `Count: ${tooltipItem.raw}`; // Tooltip label
              },
            },
          },
        },
      },
    });

    // Cleanup the chart instance on unmount or data change
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [chartData]);

  return (
    <div className="w-full h-full">
      {loading ? (
           <div className="flex justify-center items-center h-full">
           <div className="text-white text-lg font-medium">Loading Chart...</div> {/* Loader with white text */}
         </div>
      ) : (
        <canvas ref={canvasRef} id="performanceChart"></canvas>
      )}
    </div>
  );
};

export default PerformanceChart;
