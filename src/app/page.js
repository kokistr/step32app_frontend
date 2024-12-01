export default function Home() {
  return (
    // <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="main-container">    
      {/* <div className="bg-white shadow-lg rounded-lg max-w-md md:max-w-2xl w-full p-6 md:p-10"> */}
      <div className="white-container">

        {/* Image Section */}
        <div className="w-full overflow-hidden rounded-lg mb-6">
          <img
            src="/images/Welcome.png"
            alt="Creative Cooking"
            className="w-full object-cover md:h-72"
          />
        </div>

        {/* Text Section */}
        <h1 className="text-2xl md:text-3xl font-bold text-orange-500 text-center">
          Creative Cooking
        </h1>
        <p className="text-gray-700 text-center mt-4">
          ManaCoi simplifies meal planning for a stress-free culinary
          experience. Input ingredients, select a theme, and get AI-generated
          dish suggestions.
        </p>

        {/* Buttons */}
        <div className="mt-6 flex flex-col gap-4">
          <button className="orange-btn text-lg transition">
            <a href= "/signup" className="block w-full h-full">
            Start
            </a>
          </button>
          <button className="light-orange-btn text-lg transition">
            Already a member? Log in
          </button>
        </div>
      </div>
    </div>
  );
}


