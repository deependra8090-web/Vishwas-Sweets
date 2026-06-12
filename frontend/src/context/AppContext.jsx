import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

export const AppContext = createContext();

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
axios.defaults.withCredentials = true;

const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [categories, setCategories] = useState([]);
  const [menus, setMenus] = useState([]);
  const [cart, setCart] = useState({ items: [] });
  const [totalPrice, setTotalPrice] = useState(0);

  // ✅ Fetch cart data
  const fetchCartData = async () => {
    try {
      const { data } = await axios.get("/api/cart/get");
      if (data.success) {
        setCart(data.cart);
      }
    } catch (error) {
      if (error?.response?.status === 401) {
        setCart({ items: [] });
      } else {
        console.log(error);
      }
    }
  };

  // ✅ Calculate total price whenever cart changes
  useEffect(() => {
    if (cart?.items && cart.items.length > 0) {
      const total = cart.items.reduce(
        (sum, item) => sum + item.menuItem.price * item.quantity,
        0
      );
      setTotalPrice(total);
    } else {
      setTotalPrice(0);
    }
  }, [cart]);

  // ✅ Cart item count
  const cartCount = cart?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0;

  // ✅ Add to cart
  const addToCart = async (menuId) => {
    try {
      const { data } = await axios.post("/api/cart/add", {
        menuId,
        quantity: 1,
      });
      if (data.success) {
        toast.success(data.message);
        fetchCartData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Add to cart error:", error);
      toast.error("Something went wrong!");
    }
  };

  // ✅ Fetch categories
  const fetchCategories = async () => {
    try {
      const { data } = await axios.get("/api/category/all");
      if (data.success) {
        setCategories(data.categories);
      } else {
        console.log("Failed to fetch categories");
      }
    } catch (error) {
      console.log("Error fetching categories:", error);
    }
  };

  // ✅ Fetch menus
  const fetchMenus = async () => {
    try {
      const { data } = await axios.get("/api/menu/all");
      if (data.success) {
        setMenus(data.menuItems);
      } else {
        console.log("Failed to fetch menus");
      }
    } catch (error) {
      console.log("Error fetching menus:", error);
    }
  };

  // ✅ Check auth — fetch cart immediately after confirming user is logged in
  const isAuth = async () => {
    try {
      const { data } = await axios.get("/api/auth/is-auth");
      if (data.success) {
        setUser(data.user);
        await fetchCartData(); // ✅ fetch cart right after auth confirmed
      } else {
        setCart({ items: [] }); // ✅ clear cart if not logged in
      }
    } catch (error) {
      setCart({ items: [] }); // ✅ clear cart on auth failure
      if (error?.response?.status !== 401) {
        console.log(error);
      }
    }
  };

  // ✅ On app load
  useEffect(() => {
    isAuth();
    fetchCategories();
    fetchMenus();
  }, []);

  const value = {
    navigate,
    loading,
    setLoading,
    user,
    setUser,
    axios,
    admin,
    setAdmin,
    categories,
    fetchCategories,
    menus,
    fetchMenus,
    addToCart,
    cartCount,
    cart,
    totalPrice,
    fetchCartData,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;