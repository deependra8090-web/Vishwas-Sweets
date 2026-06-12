
import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { Link } from "react-router-dom";
import {
  Menu, X,
  Calendar,
  LogOut,
  Package,
  ShoppingCart,
  UserCircle,
} from "lucide-react";
import toast from "react-hot-toast";
const Navbar = () => {
  const { navigate, user, setUser, axios, cartCount } = useContext(AppContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const logout = async () => {
    try {
      const { data } = await axios.post("/api/auth/logout");
      if (data.success) {
        setUser(null);
        toast.success(data.message);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
 return (
  <nav className="sticky top-0 z-50 bg-gradient-to-r from-yellow-100 via-yellow-200 to-yellow-300 shadow-md py-3">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between min-h-[70px]">

        {/* Logo */}
        <h1
          className="flex items-center cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img
            src="logo.jpg"
            alt="Vishwas Logo"
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover mr-2"
          />

          <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#c62828]">
            Vishwas Sweets
          </span>
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4 lg:gap-8">
          <Link to="/" className="text-gray-700 hover:text-orange-600 font-medium">
            Home
          </Link>

          <Link to="/menu" className="text-gray-700 hover:text-orange-600 font-medium">
            Menus
          </Link>

          <Link
            to="/book-table"
            className="text-gray-700 hover:text-orange-600 font-medium"
          >
            Book Table
          </Link>

          <Link
            to="/contact"
            className="text-gray-700 hover:text-orange-600 font-medium"
          >
            Contact
          </Link>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-yellow-100"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Cart */}
          <button
            onClick={() => navigate("/cart")}
            className="relative p-2 hover:bg-yellow-100 rounded-lg"
          >
            <ShoppingCart size={22} />

            <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cartCount}
            </span>
          </button>

          {/* Desktop Profile */}
          <div className="hidden md:block">
            {user ? (
              <div
                className="relative"
                onMouseEnter={() => setIsProfileOpen(true)}
                onMouseLeave={() => setIsProfileOpen(false)}
              >
                <button className="p-2 hover:bg-yellow-100 rounded-lg">
                  <UserCircle size={30} />
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2">
                    <Link
                      to="/my-bookings"
                      className="flex items-center px-4 py-2 hover:bg-gray-100"
                    >
                      <Calendar size={18} className="mr-3" />
                      My Bookings
                    </Link>

                    <Link
                      to="/my-orders"
                      className="flex items-center px-4 py-2 hover:bg-gray-100"
                    >
                      <Package size={18} className="mr-3" />
                      My Orders
                    </Link>

                    <button
                      onClick={logout}
                      className="flex items-center w-full px-4 py-2 text-red-600 hover:bg-red-50"
                    >
                      <LogOut size={18} className="mr-3" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="bg-orange-500 text-white px-5 py-2 rounded-lg hover:bg-orange-600"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-yellow-300 mt-3 pt-4">
          <div className="flex flex-col gap-4">

            <Link to="/" onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>

            <Link to="/menu" onClick={() => setIsMenuOpen(false)}>
              Menus
            </Link>

            <Link to="/book-table" onClick={() => setIsMenuOpen(false)}>
              Book Table
            </Link>

            <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
              Contact
            </Link>

            {!user ? (
              <button
                onClick={() => {
                  navigate("/login");
                  setIsMenuOpen(false);
                }}
                className="bg-orange-500 text-white py-2 rounded-lg"
              >
                Login
              </button>
            ) : (
              <>
                <Link to="/my-bookings">My Bookings</Link>
                <Link to="/my-orders">My Orders</Link>

                <button
                  onClick={logout}
                  className="text-left text-red-600"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
      </div>
  </nav>
);
};

export default Navbar;