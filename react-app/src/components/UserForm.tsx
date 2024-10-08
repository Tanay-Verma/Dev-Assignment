import React, { useState } from "react";
import { User } from "./UserTable";
import { Alert } from "./Alert";

// Mock API function
const submitToAPI = async (userData: User) => {
  // Simulate API call
  const response = await fetch("http://localhost:3000/user", {
    method: "POST",
    body: JSON.stringify(userData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const newUser = await response.json();
  return { ...newUser, id: Math.floor(Math.random() * 1000) };
};

const UserForm = () => {
  const [formData, setFormData] = useState<User>({ name: "", email: "", age: undefined });
  const [isLoading, setIsLoading] = useState(false);
  const [submittedUser, setSubmittedUser] = useState<User | null>(null);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await submitToAPI(formData);
      setSubmittedUser(result);
      console.log(result);
      setFormData({ name: "", email: "", age: 0}); // Reset form
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="max-w-md mx-auto flex justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="space-y-4 bg-gray-900 p-10 rounded-lg"
        >
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-300"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label
              htmlFor="age"
              className="block text-sm font-medium text-gray-300"
            >
              Age
            </label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {isLoading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
      {error && <Alert message={error} variant="destructive" />}
      {submittedUser && (
        <Alert
          message={`User ${submittedUser.name} created successfully!`}
          variant="success"
        />
      )}
    </>
  );
};

export default UserForm;
