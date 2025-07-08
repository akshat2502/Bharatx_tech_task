// src/pages/Home.jsx
import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import ResultsList from '../components/ResultsList';
import { fetchResults } from '../api';
import { RiLoader3Fill } from "react-icons/ri";

const Home = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async ({ country, query }) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetchResults({ country, query });
      setResults(res);
    } catch (err) {
      console.error("Error fetching results:", err);
      setError("Something went wrong. Please try again later.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">
          🌍 Global Product Price Comparison
        </h1>

        <SearchBar onSearch={handleSearch} />

        {loading && (
          <div className="text-center flex item-center justify-center gap-3 mt-4 text-gray-500"><RiLoader3Fill className='text-blue-300 animate-spin text-lg mt-1'/><p>Searching...</p></div>
        )}

        {error && (
          <p className="text-center mt-4 text-red-500">{error}</p>
        )}

        <ResultsList results={results} />
      </div>
    </div>
  );
};

export default Home;
