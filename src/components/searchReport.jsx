import React, { useState } from "react";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const SearchReport = () => {
  const [searchParams, setSearchParams] = useState({
    authorId: "",
    patientId: "",
    title: "",
    startDate: "",
    endDate: "",
  });

  const [reports, setReports] = useState([]);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearch = async (page = 1) => {
    setIsLoading(true);
    setError(null);

    try {
      const queryParams = new URLSearchParams();

      Object.entries(searchParams).forEach(([key, value]) => {
        if (value) queryParams.append(key, value);
      });

      queryParams.append("page", page);
      queryParams.append("limit", pagination.limit);

      const response = await fetch(
        `${API_BASE_URL}/api/report/search?${queryParams.toString()}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      setReports(data.reports);
      setPagination({
        total: data.total,
        page: data.page,
        limit: data.limit,
      });
    } catch (err) {
      setError(err.message || "An error occurred while searching");
      setReports([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setSearchParams({
      authorId: "",
      patientId: "",
      title: "",
      startDate: "",
      endDate: "",
    });
    setReports([]);
    setPagination({
      total: 0,
      page: 1,
      limit: 10,
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Report Search</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <input
          type="text"
          placeholder="Patient ID"
          name="patientId"
          value={searchParams.patientId}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Title"
          name="title"
          value={searchParams.title}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex items-center space-x-2">
          <label className="text-gray-700">Start Date:</label>
          <input
            type="date"
            name="startDate"
            value={searchParams.startDate}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center space-x-2">
          <label className="text-gray-700">End Date:</label>
          <input
            type="date"
            name="endDate"
            value={searchParams.endDate}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => handleSearch()}
          disabled={isLoading}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Searching..." : "Search"}
        </button>
        <button
          onClick={handleReset}
          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100"
        >
          Reset
        </button>
      </div>

      {error && (
        <div className="text-red-500 mb-4 bg-red-50 p-3 rounded-md">
          {error}
        </div>
      )}

      {reports.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-3 text-left">Title</th>
                <th className="border p-3 text-left">Author</th>
                <th className="border p-3 text-left">Patient</th>
                <th className="border p-3 text-left">Created At</th>
                <th className="border p-3 text-left">Description</th>
                <th className="border p-3 text-left">Image</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <tr key={report._id} className="hover:bg-gray-50">
                  <td className="border p-3">{report.title}</td>
                  <td className="border p-3">{report.author?.name || "N/A"}</td>
                  <td className="border p-3">
                    {report.patient?.name || "N/A"}
                  </td>
                  <td className="border p-3">
                    {new Date(report.createdAt).toLocaleDateString()}
                  </td>
                  <td className="border p-3">
                    {report.description.length > 50
                      ? `${report.description.substring(0, 50)}...`
                      : report.description}
                  </td>
                  <td className="border p-3">
                    {report.imageId ? (
                      <a
                        href={report.imageId.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        View Image
                      </a>
                    ) : (
                      "No Image"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-between items-center mt-4 p-3 bg-gray-50 rounded-md">
            <span className="text-gray-700">
              Total Reports: {pagination.total}
            </span>
            <div className="space-x-2">
              <button
                onClick={() => handleSearch(pagination.page - 1)}
                disabled={pagination.page === 1}
                className="px-3 py-1 border rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                onClick={() => handleSearch(pagination.page + 1)}
                disabled={
                  pagination.page * pagination.limit >= pagination.total
                }
                className="px-3 py-1 border rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchReport;
