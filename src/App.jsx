import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import DiagnosisPage from "./pages/DiagnosisPage";

import { DataProvider } from "./components/DataContext";
import SearchReport from "./components/searchReport";
import AboutUsPage from "./pages/AboutUsPage";
import ImageUploadPage from "./pages/ImageUploadPage";
import CreateReport from "./pages/CreateReport";
import SearchPatient from "./components/searchPatient";
import CreatePatient from "./components/createPatient";

function NotFound() {
  return (
    <div className="text-3xl font-bold text-center mt-10">
      <h1>404 Not Found</h1>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout>
        <DataProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/DiagnosisPage" element={<DiagnosisPage />} />
            <Route path="/AboutUsPage" element={<AboutUsPage />} />
            <Route path="/ImageUploadPage" element={<ImageUploadPage />} />
            <Route path="/create_report" element={<CreateReport />} />
            <Route path="/search_patient" element={<SearchPatient />} />
            <Route path="/search_report" element={<SearchReport />} />
            <Route path="/create_patient" element={<CreatePatient />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </DataProvider>
      </Layout>
    </Router>
  );
}

export default App;
