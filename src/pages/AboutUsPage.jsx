import React from "react";

function AboutUsPage() {
  return (
    <div className="bg-gradient-to-br from-green-50 to-green-100 py-10 px-4 h-screen">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-xl sm:text-3xl font-semibold text-gray-800 mb-1 sm:m-24 ">Meet Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-8">
          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all">
            <div className="flex justify-center gap-6 mb-6">
              <a href="https://twitter.com/rjanupam" target="_blank" rel="noopener noreferrer">
                <img className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg shadow-md" src="https://cdn-icons-png.flaticon.com/512/733/733579.png" alt="Twitter" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <img className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg shadow-md" src="https://cdn-icons-png.flaticon.com/512/733/733561.png" alt="LinkedIn" />
              </a>
            </div>
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-800">Anupam Jain</h3>
            <p className="text-gray-600">ML & Backend Developer</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all">
            <div className="flex justify-center gap-6 mb-6">
              <a href="http://github.com/atharvmahajan32" target="_blank" rel="noopener noreferrer">
                <img className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg shadow-md" src="https://cdn-icons-png.flaticon.com/512/733/733553.png" alt="GitHub" />
              </a>
              <a href="https://www.linkedin.com/in/atharvmahajan63/" target="_blank" rel="noopener noreferrer">
                <img className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg shadow-md" src="https://cdn-icons-png.flaticon.com/512/733/733561.png" alt="LinkedIn" />
              </a>
            </div>
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-800">Atharv Mahajan</h3>
            <p className="text-gray-600">ML & Frontend Developer</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all">
            <div className="flex justify-center gap-6 mb-6">
              <a href="https://github.com/axhxshdby" target="_blank" rel="noopener noreferrer">
                <img className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg shadow-md" src="https://cdn-icons-png.flaticon.com/512/733/733553.png" alt="GitHub" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <img className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg shadow-md" src="https://cdn-icons-png.flaticon.com/512/733/733561.png" alt="LinkedIn" />
              </a>
            </div>
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-800">Ashish Dubey</h3>
            <p className="text-gray-600">UI/UX & Documentation </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all">
            <div className="flex justify-center gap-6 mb-6">
              <a href="https://twitter.com/iushrma" target="_blank" rel="noopener noreferrer">
                <img className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg shadow-md" src="https://cdn-icons-png.flaticon.com/512/733/733579.png" alt="Twitter" />
              </a>
              <a href="https://linkedin.com/in/theayusharma" target="_blank" rel="noopener noreferrer">
                <img className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg shadow-md" src="https://cdn-icons-png.flaticon.com/512/733/733561.png" alt="LinkedIn" />
              </a>
            </div>
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-800">Ayush Sharma</h3>
            <p className="text-gray-600">Frontend Developer</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUsPage;
