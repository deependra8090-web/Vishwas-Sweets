
import Cart from "../models/cartModel.js";
import Menu from "../models/menuModel.js";

export const addToCart = async (req, res) => {
  try {
    const { menuId, quantity } = req.body;
    const { id } = req.user;
    const qty = Number(quantity) > 0 ? Number(quantity) : 1;

    const menuItem = await Menu.findById(menuId);
    if (!menuItem)
      return res.status(404).json({ message: "Menu item not found", success: false });

    let cart = await Cart.findOne({ user: id });
    if (!cart) {
      cart = new Cart({ user: id, items: [] });
    }

    const existingItem = cart.items.find(
      (item) => item.menuItem.toString() === menuId
    );

    if (existingItem) {
      existingItem.quantity += qty;
    } else {
      cart.items.push({ menuItem: menuId, quantity: qty });
    }

    await cart.save();
    const updatedCart = await Cart.findOne({ user: id }).populate("items.menuItem");
    res.status(200).json({ message: "Item added to cart", success: true, cart: updatedCart });
  } catch (error) {
    console.log(error);
    return res.json({ message: "Internal server error", success: false });
  }
};

// Get user cart
export const getCart = async (req, res) => {
  try {
    const { id } = req.user;
    const cart = await Cart.findOne({ user: id }).populate("items.menuItem");
    if (!cart) return res.status(200).json({ cart: { items: [] }, success: true });
    res.status(200).json({ cart, success: true });
  } catch (error) {
    console.log(error);
    return res.json({ message: "Internal server error", success: false });
  }
};

// Update item quantity in cart
export const updateCartQuantity = async (req, res) => {
  try {
    const { id } = req.user;
    const { menuId, quantity } = req.body;

    const cart = await Cart.findOne({ user: id });
    if (!cart) return res.status(404).json({ message: "Cart not found", success: false });

    const targetQty = Number(quantity);
    if (targetQty <= 0) {
      cart.items = cart.items.filter(
        (item) => item.menuItem.toString() !== menuId
      );
    } else {
      const item = cart.items.find(
        (item) => item.menuItem.toString() === menuId
      );
      if (item) {
        item.quantity = targetQty;
      }
    }

    await cart.save();
    const updatedCart = await Cart.findOne({ user: id }).populate("items.menuItem");
    res.status(200).json({ message: "Cart updated", success: true, cart: updatedCart });
  } catch (error) {
    console.log(error);
    return res.json({ message: "Internal server error", success: false });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const { id } = req.user;
    const { menuId } = req.params;

    const cart = await Cart.findOne({ user: id });
    if (!cart) return res.status(404).json({ message: "Cart not found", success: false });
    cart.items = cart.items.filter(
      (item) => item.menuItem.toString() !== menuId
    );
    await cart.save();
    res.status(200).json({ message: "Item removed from cart", success: true });
  } catch (error) {
    console.log(error);
    return res.json({ message: "Internal server error", success: false });
  }
};

