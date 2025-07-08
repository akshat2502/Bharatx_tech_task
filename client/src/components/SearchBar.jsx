import { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [country, setCountry] = useState('IN');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    onSearch({ country, query });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col md:flex-row items-center gap-4 bg-white shadow-md rounded-lg p-6"
    >
      <input
        type="text"
        placeholder="🔍 Search for a product..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      />

      <select
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition bg-white"
      >
        <option value="IN">🇮🇳 India</option>
        <option value="US">🇺🇸 United States</option>
        <option value="CN">🇨🇳 China</option>
      </select>

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md shadow transition"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
