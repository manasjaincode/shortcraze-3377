import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

const PerformanceChart = ({ selectedRange }) => {
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState({ labels: [], values: [] });
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch data for the chart
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Set loading to true when fetching data
        const response = await fetch('/api/links/stats');
        const data = await response.json();

        const newChartData = {
          labels: Object.keys(data),
          values: Object.values(data),
        };

        setChartData(newChartData);
      } catch (error) {
        console.error('Error fetching chart data:', error);
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };

    fetchData();
  }, [selectedRange]);

  // Create the chart when chartData changes
  useEffect(() => {
    if (!chartData.values.length) return;

    const ctx = document.getElementById('performanceChart').getContext('2d');

    // Destroy the previous chart if it exists
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    // Create the new chart
    chartRef.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: chartData.labels,
        datasets: [
          {
            label: 'Total Links Created by Users',
            data: chartData.values,
            backgroundColor: 'pink',
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            suggestedMax: Math.max(...chartData.values) * 1.2,
            ticks: {
              stepSize: 1, // Ensure only whole numbers are shown
              callback: function (value) {
                return Number.isInteger(value) ? value : ''; // Display only whole numbers
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
          <div className="loader">Loading Chart...</div> {/* Simple loader text */}
        </div>
      ) : (
        <canvas id="performanceChart"></canvas>
      )}
    </div>
  );
};

export default PerformanceChart;
