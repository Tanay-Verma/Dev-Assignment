import { useEffect, useState } from "react";

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

  if (loading) {
    return <>Loading...</>;
  }

  if (error) {
    return <>Error: {error}</>;
  }

  return (
    <>
      <div className="overflow-x-auto h-screen flex justify-center items-center">
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
            {users &&
              users.map((row, rowIndex) => (
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
      </div>
    </>
  );
};
