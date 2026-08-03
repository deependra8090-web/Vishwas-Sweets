import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { ShoppingCart } from "lucide-react";

const MenuCard = ({ menu }) => {
  const { navigate, addToCart } = useContext(AppContext);
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group flex flex-col justify-between">
      {/* Image Section  */}
      <div>
        <div
          onClick={() => navigate(`/menu-details/${menu._id}`)}
          className="relative h-56 overflow-hidden cursor-pointer"
        >
          <img
            src={menu.image}
            alt={menu.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {/* Availability Badge */}
            {!menu.isAvailable && (
              <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                Unavailable
              </div>
            )}
          </div>
        </div>

        {/* Content Section */}
        <div className="p-5">
          <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">
            {menu.name}
          </h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
            {menu.description}
          </p>
        </div>
      </div>

      {/* Price and Add to Cart Section */}
      <div className="px-5 pb-5">
        <div className="flex items-center justify-between gap-2 pt-2 border-t border-gray-100">
          <div>
            <p className="text-xl font-bold text-gray-900">₹{menu.price}</p>
          </div>

          <div className="flex items-center gap-2">
            {/* Quantity Counter in Parallel */}
            <div className="flex items-center border border-gray-300 rounded-full overflow-hidden bg-gray-50">
              <button
                type="button"
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                disabled={!menu.isAvailable || quantity <= 1}
                className="px-2 py-1 text-gray-700 hover:bg-gray-200 disabled:opacity-40 font-bold transition text-xs"
              >
                -
              </button>
              <span className="px-1.5 text-xs font-semibold text-gray-800 min-w-[18px] text-center">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((prev) => prev + 1)}
                disabled={!menu.isAvailable}
                className="px-2 py-1 text-gray-700 hover:bg-gray-200 disabled:opacity-40 font-bold transition text-xs"
              >
                +
              </button>
            </div>

            <button
              onClick={() => addToCart(menu._id, quantity)}
              disabled={!menu.isAvailable}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full font-semibold transition-all duration-300 cursor-pointer ${
                menu.isAvailable
                  ? "bg-yellow-500 hover:bg-yellow-600 text-white hover:scale-105 hover:shadow-lg active:scale-95"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              <ShoppingCart className="w-4 h-4" />{" "}
              <span className="text-sm">Add</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MenuCard;

