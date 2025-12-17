import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logoutHandler = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      
      {/* Logo */}
      <Link to="/" className="text-xl font-bold text-indigo-600">
        EzEventEntry
      </Link>

      {/* Middle Menu */}
      <div className="space-x-6">
        <Link to="/" className="font-medium hover:text-indigo-600">
          Explore
        </Link>

        {token && (
          <Link
            to="/dashboard"
            className="font-medium hover:text-indigo-600"
          >
            My Tickets
          </Link>

          
        )}

        <Link
  to="/organizer"
  className="font-medium hover:text-indigo-600"
>
  Organizer
</Link>

      </div>

      {/* Right Auth Section */}
      <div className="space-x-4">
        {token ? (
          <button
            onClick={logoutHandler}
            className="font-medium text-red-600 hover:underline"
          >
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" className="font-medium hover:text-indigo-600">
              Login
            </Link>
            <Link to="/register" className="font-medium hover:text-indigo-600">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
  