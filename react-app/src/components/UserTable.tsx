import { useEffect, useMemo, useState } from "react";

interface User {
  name: string;
  age: number;
  email: string;
}

export const UserTable = () => {
  const [users, setUsers] = useState<User[]>();
  const [columns, setColumns] = useState<string[]>();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(5);

  useEffect(() => {
    async function fetchUsers() {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:3000/users");
        const data = await response.json();
        setUsers(data);
        setColumns(Object.keys(data[0]));
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  // since this value will not change as the number of users will remain constant once the page has loaded so no need to recompute it
  const totalPages = useMemo(
    () => (users ? Math.ceil(users.length / itemsPerPage) : 0),
    [users]
  );

  if (loading) {
    return <>Loading...</>;
  }

  if (error) {
    return <>Error: {error}</>;
  }

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = users?.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="overflow-x-auto h-screen flex flex-col justify-center items-center">
        <table className="bg-gray-800 border border-gray-700">
          <thead>
            <tr className="bg-gray-900">
              {columns &&
                columns.map((header, index) => (
                  <th
                    key={index}
                    className={`px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider ${
                      index !== columns.length - 1
                        ? "border-r border-gray-700"
                        : ""
                    }`}
                  >
                    {header}
                  </th>
                ))}
            </tr>
          </thead>
          <tbody className="bg-gray-800 divide-y divide-gray-700">
            {currentItems &&
              currentItems.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={rowIndex % 2 === 0 ? "bg-white" : "bg-gray-900"}
                >
                  {Object.values(row).map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      className={`px-6 py-4 whitespace-nowrap text-sm ${
                        rowIndex % 2 === 0 ? "text-gray-900" : "text-gray-300"
                      } ${
                        cellIndex !== Object.values(row).length - 1
                          ? "border-r border-gray-700"
                          : ""
                      }`}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
        <div className="flex justify-center mt-4">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={`mx-1 px-3 py-1 rounded ${
                currentPage === number
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {number}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};
