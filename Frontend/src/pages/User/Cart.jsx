import { userContext } from "@/utils/UserContext";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast,ToastContainer } from "react-toastify";
import Cookies from "js-cookie";
import { Buffer } from "buffer";
function Cart() {
  const { user, setUser } = useContext(userContext);
  const [bill, setBill] = useState(false);
  const [total, setTotal] = useState(0);

  const navigate = useNavigate();
  // const getuser = async () => {
  //   try {
  //     const response = await axios.get("http://localhost:3000/users/user", {
  //       params: {
  //         email: Cookies.get("email"),
  //       },
  //     });
  //   } catch (error) {
  //     console.error(error);
  //     toast.error("Failed to get user details");
  //   }
  // };
  const handlePlus = async (itemId) => {
    console.log(itemId);
    const response = await axios.post(
      "http://localhost:3000/users/pmngQuantity",
      {
        id: itemId,
        email: Cookies.get("email"),
      }
    );
    console.log(response.data);

    // const updatedCart = user.cart.map((item) =>
    //   item._id === itemId ? { ...item, quantity: item.quantity + 1 } : item
    // );

    // // Update the user state with the new cart
    // setUser((prevUser) => ({
    //   ...prevUser,
    //   cart: updatedCart,
    // }));

    // // Optional: Log the updated cart to check
    // console.log(updatedCart);
  };

  const handleMinus = async (itemId) => {
    const updatedCart = user.cart.map((item) =>
      item._id === itemId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );

    setUser((prevUser) => ({
      ...prevUser,
      cart: updatedCart,
    }));

    console.log(updatedCart);
  };

  const handleRemove = async (itemId) => {
    setUser((prevUser) => {
      console.log(prevUser);
      const updatedCart = prevUser.cart.filter((item) => item._id !== itemId);
      console.log(updatedCart);
      return { ...prevUser, cart: updatedCart };
    });
    const response = await axios.post(
      "http://localhost:3000/users/removeFCart",
      {
        id: itemId,
        email: Cookies.get("email"),
      }
    );

    if (response.status === 200) {
      toast.success("Item removed from cart successfully!");
    } else {
      toast.error("Failed to remove item from cart.");
    }
  };

  const handleCheckOut = () => {
    console.log(user?.cart)
    if(user?.cart.length !== 0){
      setBill(true);
    }else{
      toast.error("no items to check out")
    }
    
     
  };
  const handleYes= async () => {
    try {
      setBill(false)
      console.log(user?.cart);
      const response = await axios.post("http://localhost:3000/users/orders", {
        data: user?.cart,
        email: Cookies.get("email"),
      });
      if (response.status === 200) {
        setUser((prevUser) => ({
          ...prevUser,
          cart: [],
        }));
        toast.success("CheckOut successfully!");
        
      }
    } catch (error) {
      console.error("Error checking out:", error);
      toast.error("An error occurred while checking out.");
    }
  }

  useEffect(() => {
    setTotal(
      user?.cart.reduce(
        (acc, item) => acc + item.price * (1 - item.discount / 100),
        0
      )
    );
  }, [user?.cart]);

  return (
    <div className="h-screen w-full bg-zinc-900 text-gray-200">
      {/* Header */}
      <div className="h-[10%] flex items-center justify-between px-6 border-b-2 border-orange-500">
        <span
          onClick={() => navigate(-1)}
          className="text-2xl text-orange-400 cursor-pointer hover:text-orange-300"
        >
          <i className="ri-arrow-left-line"></i>
        </span>
        <h1 className="text-4xl font-bold text-orange-400">Cart 🛒</h1>
        <span></span>
      </div>

      {/* Cart Items */}
      <div className="h-[90%] w-full  p-6">
        <ul className="space-y-2 rounded-lg h-[90%] overflow-y-auto w-full">
          {user?.cart &&
            user.cart.map((item, i) => (
              <li
                key={i}
                className="flex items-center bg-zinc-800 rounded-lg p-4 shadow-md"
              >
                {/* Product Image */}
                <div className="w-[150px] h-[150px]">
                  <img
                    src={`data:image/jpeg;base64,${Buffer.from(
                      item.image.data
                    ).toString("base64")}`}
                    alt="product"
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>

                {/* Product Details */}
                <div className="ml-6 flex flex-col space-y-2 flex-1">
                  <h1 className="text-xl font-semibold text-orange-300">
                    {item.name}
                  </h1>
                  <h2 className="text-lg">
                    Price: $<span className="line-through">{item.price}</span>
                    <span className=" ml-1 text-xs">{item.discount}%</span>
                  </h2>

                  {/* Quantity Control */}
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => handleMinus(item._id)}
                      className="px-2 py-1 bg-orange-500 text-white rounded hover:bg-orange-400"
                    >
                      -
                    </button>
                    <span className="text-lg font-semibold">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => handlePlus(item._id)}
                      className="px-2 py-1 bg-orange-500 text-white rounded hover:bg-orange-400"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div>
                  <button
                    onClick={() => handleRemove(item._id)}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
        </ul>
        <div className="flex justify-between items-center border-t-2 border-orange-500 pt-4">
          <h2 className="text-2xl font-semibold">Total: ${total}</h2>
          <button
            onClick={handleCheckOut}
            className="px-6 py-2 bg-orange-500 text-white rounded-lg text-lg hover:bg-orange-400"
          >
            Checkout
          </button>
        </div>
      </div>
      {bill && (
        <div className="h-[80%] p-4 w-[60%] flex gap-6 left-[20%] top-[15%] absolute backdrop-blur-md bg-white bg-opacity-10 rounded-lg">
          <div
            onClick={() => setBill(false)}
            className="h-[25px] w-[30px] text-center absolute left-[95%] top-[1%] bg-black rounded-2xl text-white cursor-pointer 
                   transition-transform duration-500 ease-in-out hover:scale-110 hover:bg-red-500"
          >
            <i className="ri-close-large-line"></i>
          </div>
          <div className="h-[60vh] w-full  mt-6 rounded-md">
            <section className="mb-4 h-full rounded-md w-auto bg-white overflow-y-scroll p-4">
              {user?.cart.map((order, i) => (
                <div key={i} className="bg-gray-800 p-4 rounded-lg flex items-center gap-4 mb-4">
                  <img
                    src={`data:image/jpeg;base64,${Buffer.from(
                      order.image.data
                    ).toString("base64")}`}
                    alt="Product"
                    className="w-20 h-20 rounded-lg"
                  />
                  <div>
                    <p className="text-lg font-medium">{order.name}</p>
                    <p className="text-gray-400 ">
                      Status:
                      <span className="ml-1 text-green-600">Success</span>
                      <span className="ml-2">Delivered✅</span>{" "}
                    </p>
                    <button className="mt-2 text-orange-500 hover:underline">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </section>
            <div className="h-[20%] items-center flex justify-between w-full">
              <h1 className="mb-1 text-3xl text-orange-300">Total Bill:<span className="text-white">${total}</span></h1>
              <div className="flex gap-2 ">
              <button onClick={handleYes} className="px-6 py-2 text-2xl bg-green-700 rounded-md">
                Yes
              </button>
            
              <button onClick={() => setBill(false)} className="px-6 py-2 text-2xl bg-red-700 rounded-md">
                No
              </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <ToastContainer/>
    </div>
  );
}

export default Cart;
