// import { useState } from 'react';
// import { Line } from 'react-chartjs-2';
// import { Chart as ChartJS, LineElement, CategoryScale, LinearScale } from 'chart.js';

// ChartJS.register(LineElement, CategoryScale, LinearScale);

// function HistoryPage() {
//   const [data] = useState({
//     labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
//     datasets: [
//       {
//         label: 'Health Progress',
//         data: [10, 20, 15, 30, 25],
//         borderColor: 'blue',
//         borderWidth: 2,
//       },
//     ],
//   });

//   return (
//     <div className="pt-16">
//       <h1 className="text-3xl font-bold text-center mt-10">History Page</h1>
//       <div className="max-w-lg mx-auto mt-10">
//         <Line data={data} />
//       </div>
//       <table className="table-auto w-full mt-10">
//         <thead>
//           <tr>
//             <th className="border px-4 py-2">Date</th>
//             <th className="border px-4 py-2">Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <td className="border px-4 py-2">01/01/2024</td>
//             <td className="border px-4 py-2">Good</td>
//           </tr>
//           <tr>
//             <td className="border px-4 py-2">02/01/2024</td>
//             <td className="border px-4 py-2">Improving</td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default HistoryPage;
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Registering Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function HistoryPage() {
  const [csvData, setCsvData] = useState([]);
  const [chartData, setChartData] = useState({});
  
 
  useEffect(() => {
    const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ0FqRHHWksljAcG6FFUPDFF6FZ4ANjsyZD9CfvqdoIWspnXk5sNF10YxA7g24FHrVkEM5ywyOB7URfA/pub?output=csv';

    fetch(csvUrl)
      .then(response => response.text())  // Get the response text (CSV data)
      .then(csvText => {
        // Parse the CSV manually
        const rows = csvText.split('\n').filter(row => row); // Split by lines and filter out empty rows
        const headers = rows[0].split(','); // Assuming the first row is the header
        const data = rows.slice(1).map(row => {
          const columns = row.split(',');
          return {
            [headers[0]]: columns[0],  // Date
            [headers[1]]: columns[1],  // Value
          };
        });

        setCsvData(data);
        processChartData(data);
      })
      .catch((error) => console.error('Error fetching CSV:', error));
  }, []);

  // Processing CSV data for Chart.js
  const processChartData = (data) => {
    const labels = data.map(row => row['Date']);  // Assuming the column is 'Date'
    const values = data.map(row => parseFloat(row['Value']));  // Assuming the column is 'Value'

    setChartData({
      labels,
      datasets: [
        {
          label: 'Sample Data',
          data: values,
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
        },
      ],
    });
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">History Page with Data Visualization</h1>
      
      {/* Chart.js Graph */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold">Sample Data Graph</h2>
        <Line data={chartData} options={{ responsive: true }} />
      </div>

      {/* CSV Data Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">Date</th>
              <th className="px-4 py-2 border-b">Value</th>
            </tr>
          </thead>
          <tbody>
            {csvData.length > 0 ? (
              csvData.map((row, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border-b">{row.Date}</td>
                  <td className="px-4 py-2 border-b">{row.Value}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="px-4 py-2 text-center">Loading...</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default HistoryPage;
