import { Link, Outlet, useLocation } from "react-router-dom";

export default function App() {
  let location = useLocation();
  return (
    <>
      <div className="w-full flex justify-center gap-32">
        <Link to={"/home"} className="block">
          <div
            className={`cursor-pointer p-10 mt-1 rounded-lg ${
              location.pathname === "/home"
                ? "bg-gray-900 text-gray-300"
                : "border border-gray-500"
            }`}
          >
            Home
          </div>
        </Link>
        <Link to={"/users"} className="block">
          <div
            className={`cursor-pointer p-10 mt-1 rounded-lg ${
              location.pathname === "/users"
                ? "bg-gray-900 text-gray-300"
                : "border border-gray-500"
            }`}
          >
            User
          </div>
        </Link>
      </div>
      <section className="p-6">
        <Outlet />
      </section>
    </>
  );
}
