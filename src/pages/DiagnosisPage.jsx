import { useContext, useEffect, useState } from "react";
import { DataContext } from "../components/DataContext";
import { useNavigate } from "react-router-dom";

function DiagnosisPage() {
  const { response, setResponse } = useContext(DataContext);
  const navigate = useNavigate();
  const [isReportCreating, setIsReportCreating] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      navigate("/signin"); 
    }
  }, [navigate]);

  const handleCreateReport = () => {
    // Navigate to the CreateReport page
    navigate("/create_report");
  };

  return (
    <div className="pt-16 px-4 sm:px-6 md:px-8">
      <h1 className="text-3xl font-bold text-center mt-10">Diagnosis Report</h1>
      {response ? (
        <div className="mx-auto w-full sm:w-3/4 md:w-2/3 lg:w-1/2 mt-8">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden border-collapse">
            <thead>
              <tr className="bg-gradient-to-r from-blue-400 via-teal-400 to-green-500 text-white">
                <th className="px-4 py-2 sm:px-6 sm:py-4 text-left font-semibold text-sm sm:text-base">Condition</th>
                <th className="px-4 py-2 sm:px-6 sm:py-4 text-left font-semibold text-sm sm:text-base">Probability</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(response[Object.keys(response)[0]]) //slice(0,5) for colon results too (all results)
                .slice(2, 5)
                .map(([key, value], index) => (
                  <tr
                    key={index}
                    className={`transition-all duration-200 ease-in-out ${
                      index % 2 === 0 ? "bg-gray-100" : "bg-white"
                    } hover:bg-gray-200`}>
                    <td className="px-4 py-2 sm:px-6 sm:py-4 border-b border-gray-300 text-gray-800 font-medium text-sm sm:text-base">
                    {key.replace(/lung_aca/g, "Lung Adenocarcinoma").replace(/lung_n/g, "Lung Benign").replace(/lung_scc/g, "Lung Squamous Cell Carcinoma")}
                    </td>
                    <td className="px-4 py-2 sm:px-6 sm:py-4 border-b border-gray-300 text-gray-800 text-sm sm:text-base">
                      {`${(value * 100).toFixed(2)}%`}
                      
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

          {/* Create Report Button */}
          <div className="mt-4 text-center flex flex-row justify-center gap-7">
            <button
              onClick={() => {
              const token = localStorage.getItem("jwtToken");
              if (token) {
				setResponse(null)
                navigate("/ImageUploadPage");
              } else {
                navigate("/signin");
              }
							}
							}
            
              className="py-2 px-4 rounded-full border-0 text-md font-semibold hover:scale-105 transition-transform duration-300 bg-blue-50 text-green-700 hover:bg-green-100"
            >
              Back to ImageUploadPage
            </button>
			<button
              onClick={handleCreateReport}
              className="py-2 px-4 rounded-full border-0 text-md font-semibold hover:scale-105 transition-transform duration-300 bg-blue-50 text-green-700 hover:bg-green-100"
            >
              Create Report
            </button>

          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center gap-10 mt-8">
          <p className="text-center text-xl text-gray-600">
            No report data available. Please upload an image on the Image Upload page.
          </p>
						<div className="flex justify-center flex-col sm:flex-row gap-4 sm:gap-0">
							 <button
            onClick={() => {
              const token = localStorage.getItem("jwtToken");
              if (token) {
                navigate("/ImageUploadPage");
              } else {
                navigate("/signin");
              }
            }}
            type="button"
            className="mr-4 py-2 px-4 rounded-full border-0 text-md font-semibold hover:scale-105 transition-transform duration-300 bg-blue-50 text-green-700 hover:bg-green-100">
            <p>Upload Your Image</p>
          </button>
<button
            onClick={() => {
              const token = localStorage.getItem("jwtToken");
              if (token) {
                navigate("/search_patient");
              } else {
                navigate("/signin");
              }
            }}
            type="button"
            className="mr-4 py-2 px-4 rounded-full border-0 text-md font-semibold hover:scale-105 transition-transform duration-300 bg-blue-50 text-green-700 hover:bg-green-100">
            <p>Search Patient</p>
          </button>

						</div>
                 </div>

      )}
    </div>
  );
}

export default DiagnosisPage;
