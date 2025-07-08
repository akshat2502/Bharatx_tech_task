// src/components/ResultsList.jsx
const ResultsList = ({ results }) => {
  if (!results || results.length === 0) return null;

  return (
    <div className="mt-8 overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 shadow rounded">
        <thead className="bg-blue-100 text-blue-700">
          <tr>
            <th className="px-4 py-3 text-left border-b">#</th>
            <th className="px-4 py-3 text-left border-b">Product Name</th>
            <th className="px-4 py-3 text-left border-b">Price</th>
            <th className="px-4 py-3 text-left border-b">Link</th>
          </tr>
        </thead>
        <tbody>
          {results.map((item, index) => (
            <tr key={index} className="hover:bg-gray-50 transition">
              <td className="px-4 py-3 border-b">{index + 1}</td>
              <td className="px-4 py-3 border-b">{item.productName}</td>
              <td className="px-4 py-3 border-b">
                {item.currency} {item.price.toLocaleString()}
              </td>
              <td className="px-4 py-3 border-b">
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  View Product
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResultsList;
