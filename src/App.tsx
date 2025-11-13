import { useState, type ChangeEvent, type FormEvent } from "react";

const RESTCOUNTRIES_BASE_URL = import.meta.env.VITE_RESTCOUNTRIES_BASE_URL;

const App = () => {
  const [searchKey, setSearchKey] = useState("");
  // const [countryInfo, setCountryInfo] = useState("");

  const fetchCountriesDetails = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${RESTCOUNTRIES_BASE_URL}/name/${searchKey}`
      );

      if (response.ok) {
        const data = await response.json();

        console.log(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="min-h-[60vh] flex flex-col justify-center items-center bg-gray-50 px-4 sm:px-6">
      {/* Title */}
      <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight mb-10 text-center">
        Search<span className="text-blue-600">Around</span>
      </h1>

      {/* Search Form */}
      <form
        onSubmit={fetchCountriesDetails}
        className="flex justify-center items-center w-full max-w-2xl gap-2 sm:gap-3"
      >
        <div className="flex flex-1 items-center border-2 border-gray-300 rounded-full overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 bg-white transition">
          <input
            type="text"
            placeholder="Search a country..."
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSearchKey(e.target.value)
            }
            className="w-full px-5 py-3 text-gray-800 placeholder-gray-400 focus:outline-none"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white font-medium hover:bg-blue-700 focus:outline-none transition-all"
          >
            Search
          </button>
        </div>
      </form>
    </section>
  );
};

export default App;
