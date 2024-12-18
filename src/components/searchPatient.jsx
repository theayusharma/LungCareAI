import React, { useState } from "react";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const SearchPatient = ({ onSelectPatient }) => {
  const [searchParams, setSearchParams] = useState({
    username: "",
    name: "",
    email: "",
    bloodGroup: "",
    minAge: "",
    maxAge: "",
  });

  const [patients, setPatients] = useState([]);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

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
        `${API_BASE_URL}/api/patient/search?${queryParams.toString()}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("No patients found");
      }

      const data = await response.json();

      setPatients(data.patients);
      setPagination({
        total: data.total,
        page: data.page,
        limit: data.limit,
      });
    } catch (err) {
      setError(err.message || "An error occurred while searching");
      setPatients([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePatientSelect = (patient) => {
    onSelectPatient(patient);
  };

  const handleReset = () => {
    setSearchParams({
      username: "",
      name: "",
      email: "",
      bloodGroup: "",
      minAge: "",
      maxAge: "",
    });
    setPatients([]);
    setPagination({
      total: 0,
      page: 1,
      limit: 10,
    });
  };

  return (
    <div className="max-w-3xl mx-auto mt-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-center text-2xl/9 font-bold tracking-tight text-gray-900 mb-8">
        Search Patient
      </h1>
      {error && <p className="text-red-500 text-center text-sm mb-4">{error}</p>}
      <form className="space-y-6">
        {[
          { name: "username", type: "text", placeholder: "Username" },
          { name: "name", type: "text", placeholder: "Name" },
          { name: "email", type: "text", placeholder: "Email" },
          { name: "minAge", type: "number", placeholder: "Min Age" },
          { name: "maxAge", type: "number", placeholder: "Max Age" },
        ].map((field) => (
          <div key={field.name} className="space-y-2">
            <label className="block text-sm/6 font-medium text-gray-900">
              {field.placeholder}
            </label>
            <input
              type={field.type}
              name={field.name}
              placeholder={field.placeholder}
              value={searchParams[field.name]}
              onChange={handleInputChange}
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6"
            />
          </div>
        ))}

        <div className="space-y-2">
          <label className="block text-sm/6 font-medium text-gray-900">
            Blood Group
          </label>
          <select
            name="bloodGroup"
            value={searchParams.bloodGroup}
            onChange={handleInputChange}
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6"
          >
            <option value="">Select Blood Group</option>
            {bloodGroups.map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-center space-x-4">
          <button
            type="button"
            onClick={() => handleSearch()}
            disabled={isLoading}
            className={`flex w-1/2 justify-center rounded-3xl text-sm/6 shadow-sm py-2 px-4 transition-transform duration-300 ${
              isLoading
                ? "bg-gray-300 text-gray-700 cursor-not-allowed"
                : "bg-blue-100 text-green-700 hover:bg-green-100 hover:scale-103"
            }`}
          >
            {isLoading ? "Searching..." : "Search"}
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="flex w-1/2 justify-center rounded-3xl text-sm/6 shadow-sm py-2 px-4 bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-103 transition-transform duration-300"
          >
            Reset
          </button>
        </div>
      </form>

      {patients.length > 0 && (
        <div className="mt-8 overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-3 text-left">Username</th>
                <th className="border p-3 text-left">Name</th>
                <th className="border p-3 text-left">Email</th>
                <th className="border p-3 text-left">Age</th>
                <th className="border p-3 text-left">Blood Group</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient) => (
                <tr
                  key={patient._id}
                  className="hover:bg-gray-50"
                  onClick={() => handlePatientSelect(patient)}
                >
                  <td className="border p-3">{patient.username}</td>
                  <td className="border p-3">{patient.name}</td>
                  <td className="border p-3">{patient.email}</td>
                  <td className="border p-3">{patient.age}</td>
                  <td className="border p-3">{patient.bloodGroup || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {patients.length === 0 && !isLoading && (
        <p className="text-center text-gray-600 mt-8">No patients found</p>
      )}
    </div>
  );
};

export default SearchPatient;
