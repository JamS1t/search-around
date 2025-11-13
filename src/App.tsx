import { useState, type ChangeEvent, type FormEvent } from "react";

const RESTCOUNTRIES_BASE_URL = import.meta.env.VITE_RESTCOUNTRIES_BASE_URL;

interface Country {
  name: {
    common: string;
    official: string;
  };
  flag: string;
  flags: {
    png: string;
    svg: string;
    alt?: string;
  };
  capital?: string[];
  region?: string;
  subregion?: string;
  population?: number;
  area?: number;
  currencies?: Record<string, { name: string; symbol: string }>;
  languages?: Record<string, string>;
  maps?: {
    googleMaps: string;
  };
  coatOfArms?: {
    png?: string;
    svg?: string;
  };
}

const App = () => {
  const [searchKey, setSearchKey] = useState("");
  const [countryInfo, setCountryInfo] = useState<Country | null>(null);

  const fetchCountriesDetails = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${RESTCOUNTRIES_BASE_URL}/name/${searchKey}`
      );

      if (response.ok) {
        const data = await response.json();

        console.log(data);

        setCountryInfo(data[0]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="bg-sky-100">
      <section
        id="hero"
        className="min-h-[60vh] flex flex-col justify-center items-center bg-gray-50 px-4 sm:px-6"
      >
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight mb-10 text-center">
          Search<span className="text-blue-600">Around</span>
        </h1>

        <form
          onSubmit={fetchCountriesDetails}
          className="flex justify-center items-center w-full max-w-2xl gap-2 sm:gap-3"
        >
          <div className="flex flex-1 items-center border-2 border-gray-300 rounded-2xl overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 bg-white transition">
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

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {countryInfo && (
          <>
            <div className="flex justify-start gap-8 px-2 py-6">
              <img className="w-100 h-auto border-2 border-gray-200" src={countryInfo?.flags.png} alt={countryInfo?.flags.alt} />

              <div className="flex flex-col justify-center gap-2">
                <h2 className="text-7xl font-extrabold">{countryInfo.name.common}</h2>

                <p className="text-2xl font-semibold"><span className="font-bold">{countryInfo.flag}</span> {countryInfo.name.official}</p>
                <p className="italic">{countryInfo.subregion}</p>
              </div>
            </div>
          </>
        )}
      </section>
    </main>
  );
};

export default App;
