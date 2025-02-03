import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

const PerformanceChart = ({ selectedRange }) => {
  const chartRef = useRef(null);
  const canvasRef = useRef(null);
  const [chartData, setChartData] = useState({ labels: [], values: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/links/stats');
        const data = await response.json();

        console.log("Fetched Data:", data); // Debugging API response

        // Normalize the year data if it's less than twice the 6-months value
        const normalizedData = { ...data };
        if (normalizedData.year && normalizedData.sixMonths) {
          const estimatedYearly = normalizedData.sixMonths * 2;
          if (normalizedData.year < estimatedYearly) {
            normalizedData.year = Math.round(estimatedYearly * (12 / Object.keys(data).length));
          }
        }

        // Filter out unnecessary data
        const filteredData = Object.entries(normalizedData).filter(([key]) => key.toLowerCase() !== 'week');

        const newChartData = {
          labels: filteredData.map(([key]) => key),
          values: filteredData.map(([, value]) => value),
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

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    // Creating a bar chart
    chartRef.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: chartData.labels,
        datasets: [
          {
            label: 'Links Created Over Time',
            data: chartData.values,
            backgroundColor: 'rgba(144, 238, 144, 0.7)', // Light green fill
            borderColor: 'green', // Dark green border
            borderWidth: 2,
            borderRadius: 5, // Rounded bar edges
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            grid: { display: false },
            title: {
              display: true,
              text: 'Time Periods',
              font: { size: 14, weight: 'bold' },
              color: 'pink',
            },
            ticks: { color: 'white' },
          },
          y: {
            beginAtZero: true,
            grid: { color: '#e0e0e0' },
            title: {
              display: true,
              text: 'Count of Links Created',
              font: { size: 14, weight: 'bold' },
              color: 'pink',
            },
            ticks: { color: 'white' },
          },
        },
        plugins: {
          legend: {
            display: true,
            labels: { color: 'white' },
          },
          tooltip: {
            callbacks: {
              label: (tooltipItem) => `Count: ${tooltipItem.raw}`,
            },
          },
        },
      },
    });

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
          <div className="text-white text-lg font-medium">Loading Chart...</div>
        </div>
      ) : (
        <canvas ref={canvasRef} id="performanceChart"></canvas>
      )}
    </div>
  );
};

export default PerformanceChart;
