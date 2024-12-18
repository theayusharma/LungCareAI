import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import CreatePatient from "../components/createPatient";
import SearchPatient from "../components/searchPatient";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const CreateReport = () => {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isCreatingPatient, setIsCreatingPatient] = useState(false);
  const [reportTitle, setReportTitle] = useState("");
  const [reportDescription, setReportDescription] = useState("");
  const [errors, setErrors] = useState({ title: "", description: "" });

  const location = useLocation();
  const { image, results } = location.state || {};

  const handleSelectPatient = (patient) => {
    setSelectedPatient(patient);
  };

  const handleCreatePatient = () => {
    setIsCreatingPatient(true);
  };

  const handlePatientCreated = (patient) => {
    setSelectedPatient(patient);
    setIsCreatingPatient(false);
  };

  const handleSubmitReport = async (e) => {
    e.preventDefault();

    let formErrors = {};
    if (!reportTitle) formErrors.title = "Report title is required.";
    if (!reportDescription) formErrors.description = "Report description is required.";

    setErrors(formErrors);

    if (Object.keys(formErrors).length > 0) return; // Stop if there are errors

    try {
      const reportData = {
        authorId: localStorage.getItem("userId"),
        patientEmail: selectedPatient.email,
        title: reportTitle,
        description: reportDescription,
        imageId: image ? results.imageId : null,
      };

      const response = await fetch(`${API_BASE_URL}/api/report/new`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(reportData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit report.");
      }

      alert("Report submitted successfully!");
    } catch (error) {
      console.error("Error submitting report:", error);
      alert("An error occurred while submitting the report.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-center text-2xl/9 font-bold tracking-tight text-gray-900 mb-8">
        Create Report
      </h1>

      {!isCreatingPatient ? (
        <>
          {!selectedPatient ? (
            <div className="space-y-6">
              <SearchPatient onSelectPatient={handleSelectPatient} />
              <button
                onClick={handleCreatePatient}
                className="flex w-full justify-center rounded-3xl text-lg font-semibold bg-blue-100 text-green-700 hover:bg-green-100 transition-all duration-300 shadow-lg transform hover:scale-105 py-2 px-4"
              >
                New Patient
              </button>
            </div>
          ) : (
            <div className="space-y-8">
              <h2 className="text-xl font-semibold text-gray-800">Selected Patient</h2>
              <p className="text-lg text-gray-700">{selectedPatient.name}</p>
              <p className="text-lg text-gray-700">{selectedPatient.email}</p>

              {image && (
                <div className="mt-6">
                  <h3 className="text-lg font-medium text-gray-800">Uploaded Image</h3>
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Uploaded"
                    className="object-contain w-full max-w-lg mx-auto rounded-lg shadow-xl mt-4"
                  />
                </div>
              )}

              {results && (
                <div className="mt-6">
                  <h3 className="text-lg font-medium text-gray-800">Classification Results</h3>
                  <pre className="bg-gray-100 p-4 rounded-lg shadow-md text-sm text-gray-700 mt-4">
                    {JSON.stringify(results.data[0], null, 2)}
                  </pre>
                </div>
              )}

              <form onSubmit={handleSubmitReport} className="space-y-6 mt-6">
                <div className="space-y-2">
                  <label className="block text-sm/6 font-medium text-gray-900">Report Title</label>
                  <input
                    type="text"
                    placeholder="Enter report title"
                    value={reportTitle}
                    onChange={(e) => setReportTitle(e.target.value)}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6"
                  />
                  {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm/6 font-medium text-gray-900">Report Description</label>
                  <textarea
                    placeholder="Enter report description"
                    value={reportDescription}
                    onChange={(e) => setReportDescription(e.target.value)}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6 h-36"
                  ></textarea>
                  {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                </div>

                <button
                  type="submit"
                  className="flex w-full justify-center rounded-3xl text-sm/6 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 py-2 px-4 bg-blue-100 text-green-700 hover:bg-green-100 hover:scale-103 transition-transform duration-300"
                >
                  Submit Report
                </button>
              </form>
            </div>
          )}
        </>
      ) : (
        <CreatePatient onPatientCreated={handlePatientCreated} />
      )}
    </div>
  );
};

export default CreateReport;
