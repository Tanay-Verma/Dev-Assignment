import { useState } from "react";
import UserForm from "./components/UserForm";
import { UserTable } from "./components/UserTable";

type pages = "home" | "user";

export default function App() {
  const [page, setPage] = useState<pages>("home");
  return (
    <>
      <div className="w-full flex justify-center gap-32">
        <span
          onClick={() => setPage("home")}
          className={`cursor-pointer p-10 mt-1 rounded-lg ${
            page === "home" ? "bg-gray-900 text-gray-300" : "border border-gray-500"
          }`}
        >
          Home
        </span>
        <span
          onClick={() => setPage("user")}
          className={`cursor-pointer p-10 mt-1 rounded-lg ${
            page === "user" ? "bg-gray-900 text-gray-300" : "border border-gray-500"
          }`}
        >
          User
        </span>
      </div>
      {page === "user" && <UserTable />}
      {page === "home" && <UserForm />}
    </>
  );
}
