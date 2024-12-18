import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const CreatePatient = ({ onPatientCreated }) => {
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    age: "",
    email: "",
    bloodGroup: "",
    address: "",
    phone: "",
  });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const lastPage = queryParams.get("last_page") || "/";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/patient/new`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create patient");
      }

      setMessage("User created successfully");

      setFormData({
        username: "",
        name: "",
        age: "",
        email: "",
        bloodGroup: "",
        address: "",
        phone: "",
      });

      if (onPatientCreated) {
        const data = await response.json();
        onPatientCreated(data.patient);
      } else if (lastPage !== "/") {
        navigate(lastPage);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-center text-2xl/9 font-bold tracking-tight text-gray-900 mb-8">
        Create New Patient
      </h1>
      {error && <p className="text-red-500 text-center text-sm mb-4">{error}</p>}
      {message && <p className="text-green-500 text-center text-sm mb-4">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-6">
        {[
          { name: "username", type: "text", placeholder: "Username", required: true },
          { name: "name", type: "text", placeholder: "Name", required: true },
          { name: "age", type: "number", placeholder: "Age", required: true },
          { name: "email", type: "email", placeholder: "Email", required: true },
          { name: "bloodGroup", type: "text", placeholder: "Blood Group", required: false },
          { name: "address", type: "text", placeholder: "Address", required: false },
          { name: "phone", type: "text", placeholder: "Phone", required: true },
        ].map((field) => (
          <div key={field.name} className="space-y-2">
            <label className="block text-sm/6 font-medium text-gray-900">{field.placeholder}</label>
            <input
              type={field.type}
              name={field.name}
              placeholder={field.placeholder}
              value={formData[field.name]}
              onChange={handleChange}
              required={field.required}
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6"
            />
          </div>
        ))}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`flex w-full justify-center rounded-3xl text-sm/6 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 py-2 px-4 ${
            isSubmitting
              ? "bg-gray-300 text-gray-700 cursor-not-allowed"
              : "bg-blue-100 text-green-700 hover:bg-green-100 hover:scale-103 transition-transform duration-300"
          }`}
        >
          {isSubmitting ? "Creating..." : "Create Patient"}
        </button>
      </form>
    </div>
  );
};

export default CreatePatient;
