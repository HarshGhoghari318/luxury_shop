
import { userContext } from "@/utils/UserContext";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Cookies from "js-cookie";
import { Buffer } from "buffer";

function Cart() {
  const { user, setUser } = useContext(userContext);
  const [bill, setBill] = useState(false);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  // ➕ PLUS
  const handlePlus = async (itemId) => {
    // Optimistic UI update
    setUser((prev) => ({
      ...prev,
      cart: prev.cart.map((item) =>
        item._id === itemId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ),
    }));

    try {
      await axios.post("http://localhost:3000/users/pmngQuantity", {
        id: itemId,
        email: Cookies.get("email"),
        type: "plus",
      });
    } catch {
      toast.error("Failed to increase quantity");
    }
  };

  // ➖ MINUS
  const handleMinus = async (itemId) => {
    setUser((prev) => ({
      ...prev,
      cart: prev.cart.map((item) =>
        item._id === itemId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      ),
    }));

    try {
      await axios.post("http://localhost:3000/users/pmngQuantity", {
        id: itemId,
        email: Cookies.get("email"),
        type: "minus",
      });
    } catch {
      toast.error("Failed to decrease quantity");
    }
  };

  // ❌ REMOVE ITEM
  const handleRemove = async (itemId) => {
    setUser((prev) => ({
      ...prev,
      cart: prev.cart.filter((item) => item._id !== itemId),
    }));

    try {
      await axios.post("http://localhost:3000/users/removeFCart", {
        id: itemId,
        email: Cookies.get("email"),
      });
      toast.success("Item removed");
    } catch {
      toast.error("Failed to remove item");
    }
  };

  // 💰 TOTAL
  useEffect(() => {
    setTotal(
      user?.cart.reduce(
        (acc, item) =>
          acc +
          item.quantity *
            item.price *
            (1 - item.discount / 100),
        0
      )
    );
  }, [user?.cart]);

  // 🧾 CHECKOUT
  const handleCheckOut = () => {
    if (!user?.cart.length) return toast.error("Cart is empty");
    setBill(true);
  };

  const handleYes = async () => {
    try {
      await axios.post("http://localhost:3000/users/orders", {
        data: user.cart,
        email: Cookies.get("email"),
      });

      setUser((prev) => ({ ...prev, cart: [] }));
      setBill(false);
      toast.success("Order placed successfully");
    } catch {
      toast.error("Checkout failed");
    }
  };

  return (
    <div className="h-screen w-full bg-zinc-900 text-gray-200">
      {/* HEADER */}
      <div className="h-[10%] flex items-center justify-between px-6 border-b-2 border-orange-500">
        <span
          onClick={() => navigate(-1)}
          className="text-2xl text-orange-400 cursor-pointer"
        >
          <i className="ri-arrow-left-line"></i>
        </span>
        <h1 className="text-4xl font-bold text-orange-400">Cart 🛒</h1>
        <span />
      </div>

      {/* CART LIST */}
      <div className="h-[90%] p-6">
        <ul className="space-y-2 h-[90%] overflow-y-auto">
          {user?.cart.map((item, i) => (
            <li key={i} className="flex bg-zinc-800 p-4 rounded-lg">
              <img
                src={`data:image/jpeg;base64,${Buffer.from(
                  item.image.data
                ).toString("base64")}`}
                className="w-32 h-32 object-cover rounded"
              />

              <div className="ml-6 flex-1">
                <h1 className="text-xl text-orange-300">{item.name}</h1>
                <p>
                  <span className="line-through">${item.price}</span>{" "}
                  <span className="text-sm">
                    {item.discount}%
                  </span>
                </p>

                <div className="flex items-center gap-4 mt-2">
                  <button
                    onClick={() => handleMinus(item._id)}
                    className="px-3 py-1 bg-orange-500 rounded"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => handlePlus(item._id)}
                    className="px-3 py-1 bg-orange-500 rounded"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={() => handleRemove(item._id)}
                className="bg-red-600 h-[50px] w-[100px] mt-8 rounded"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>

        <div className="flex justify-between border-t border-orange-500 pt-4">
          <h2 className="text-2xl">Total: ${total.toFixed(2)}</h2>
          <button
            onClick={handleCheckOut}
            className="bg-orange-500 px-6 py-2 rounded"
          >
            Checkout
          </button>
        </div>
      </div>

      {/* CONFIRM MODAL */}
      {bill && (
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
          <div className="bg-zinc-800 p-6 rounded-lg w-[40%]">
            <h1 className="text-3xl text-orange-300 mb-4">
              Total: ${total.toFixed(2)}
            </h1>
            <div className="flex gap-4">
              <button
                onClick={handleYes}
                className="bg-green-600 px-6 py-2 rounded"
              >
                Yes
              </button>
              <button
                onClick={() => setBill(false)}
                className="bg-red-600 px-6 py-2 rounded"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
}

export default Cart;
