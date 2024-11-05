import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

const PerformanceChart = ({ selectedRange }) => {
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState({ labels: [], values: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/links/stats');
        const data = await response.json();

        const newChartData = {
          labels: Object.keys(data),
          values: Object.values(data),
        };

        setChartData(newChartData);
      } catch (error) {
        console.error('Error fetching chart data:', error);
      }
    };

    fetchData();
  }, [selectedRange]);

  useEffect(() => {
    if (!chartData.values.length) return;

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const ctx = document.getElementById('performanceChart').getContext('2d');

    chartRef.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: chartData.labels,
        datasets: [{
          label: 'Total Links Created by Users',
          data: chartData.values,
          backgroundColor: 'pink',
        }]
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
              callback: function(value) { return Number.isInteger(value) ? value : ''; } // Display only whole numbers
            }
          }
        }
      }
    });

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [chartData]);

  return (
    <div className="w-full h-full">
      <canvas id="performanceChart"></canvas>
    </div>
  );
};

export default PerformanceChart;
