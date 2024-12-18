import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import CreatePatient from "../components/createPatient";
import SearchPatient from "../components/searchPatient"; // Import the SearchPatient component

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const CreateReport = () => {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isCreatingPatient, setIsCreatingPatient] = useState(false);
  const [reportTitle, setReportTitle] = useState("");
  const [reportDescription, setReportDescription] = useState("");

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

    if (!selectedPatient || !reportTitle || !reportDescription) {
      alert("Please fill in all required fields.");
      return;
    }

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
    <div>
      <h1>Create Report</h1>
      {!isCreatingPatient ? (
        <>
          {!selectedPatient ? (
            <div>
              <SearchPatient onSelectPatient={handleSelectPatient} />
              <button onClick={handleCreatePatient}>New Patient</button>
            </div>
          ) : (
            <div>
              <h2>Selected Patient</h2>
              <p>{selectedPatient.name}</p>
              <p>{selectedPatient.email}</p>

              {image && (
                <div>
                  <h3>Uploaded Image</h3>
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Uploaded"
                    className="object-contain w-1/3"
                  />
                </div>
              )}

              {results && (
                <div>
                  <h3>Classification Results</h3>
                  <pre>{JSON.stringify(results.data[0], null, 2)}</pre>
                </div>
              )}

              <form onSubmit={handleSubmitReport}>
                <input
                  type="text"
                  placeholder="Report Title"
                  value={reportTitle}
                  onChange={(e) => setReportTitle(e.target.value)}
                />
                <textarea
                  placeholder="Report Description"
                  value={reportDescription}
                  onChange={(e) => setReportDescription(e.target.value)}
                ></textarea>
                <button type="submit">Submit Report</button>
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
