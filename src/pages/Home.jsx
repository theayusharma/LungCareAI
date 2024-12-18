import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div className=" min-h-screen bg-gray-100 p-6 flex flex-col gap-8">
      <div className="text-center animate-fade-in-down">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900">Welcome to LungCare.AI</h1>
        <p className="mt-4 text-base sm:text-lg text-gray-600">A project based on AI</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-white shadow-lg rounded-lg p-6 animate-fade-in-left">
          <h2 className="text-xl sm:text-2xl font-semibold text-green-700 text-center">Cancer</h2>
          <p className="mt-4 text-sm sm:text-base text-gray-700 text-justify">
            Cancer is a sickness that can happen to anyone. It starts when some cells in our body grow too much and too fast. It’s like a garden where flowers grow too much and start causing problems. Doctors use different ways to fight cancer like medicine, special rays, or sometimes, surgery.
            It’s important to eat healthy food, exercise, and not smoke to stay away from cancer. Also, if anyone in your family is not feeling well for a long time, they should see a doctor. The sooner cancer is found, the better chance there is to get better.
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 animate-fade-in-right ">
          <h2 className="text-xl sm:text-2xl font-semibold text-green-700 text-center">What is LungCare.ai?</h2>
          <p className="mt-4 text-sm sm:text-base text-gray-700 text-justify">
            LungCare.ai is a user-friendly platform developed for healthcare professionals to get an accurate diagnosis of the presence of cancer cells in the histopathological images of lungs. Our platform enables the user to identify the cancerous cell type which is extremely important in the further course of treatment.
          </p>
        </div>
      </div>

      <div className="text-center bg-green-100 rounded-lg shadow-md p-6 sm:p-8 animate-fade-in-up">
        <h3 className="text-2xl sm:text-3xl font-bold text-green-800">Get Started</h3>
        <p className="text-base sm:text-lg text-gray-700 mt-4">
          Upload your histopathological images of lung and colon here for the diagnosis.
        </p>
        <button
          onClick={() => navigate('/ImageUploadPage')}
          type="button"
          className="mt-6 py-2 sm:py-3 px-4 sm:px-6text-sm sm:text-lg bg-transform rounded-full border-0 text-md font-semibold shadow-md bg-blue-50 text-green-700 hover:bg-green-100 transform hover:scale-105 transition-transform duration-300"
        >
          Upload Your Image
        </button>
      </div>
    </div>
  );
}

export default Home;
