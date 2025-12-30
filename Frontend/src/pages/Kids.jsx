import React, { useContext, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { Buffer } from "buffer";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { userContext } from "@/utils/UserContext";

function Kids() {
  const [products, setProducts] = useState(null);
  const { user ,setUser} =useContext(userContext)
  const [KidProduct, setKidProduct] = useState([]);
  const [item,setItems]=useState("all")
  
  const allkidsProduct = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/product/sendData`,
        {
          params: {
            category: "kids",
            item: item
          },
        }
      );

      setKidProduct(response.data.data);
      
    } catch (error) {
      console.log(error);
    }
  };

  const addtoCart = async (id) => {
    try {
      // Safely update the cart
      setUser((prev) => {
        if (!Array.isArray(prev) || prev.length === 0) {
          return prev;  // If prev is not an array or it's empty, don't do anything
        }
  
        // Ensure the cart array exists and is updated
        const updatedUser = { ...prev[0] };
        updatedUser.cart = [...updatedUser.cart, id];  // Add the new item to the cart
  
        return [updatedUser]; // Return the updated state as an array
      });

      const response = await axios.post(
        `http://localhost:3000/users/addtoCart`,
        {
          id: id,
          email: Cookies.get("email"),
        }
      );
  
      if (response.status === 200) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("An error occurred while adding to the cart.");
    }
  };
  
  const removeFromtheCart = async (id) => {
    try {
      // Find the item in the cart
      const itemIndex = user.cart.findIndex((item) => item._id === id);
  
      if (itemIndex !== -1) {
        // Optimistically update the state
        setUser((prev) => {
          const updatedUser = { ...prev }; // Copy the user object
          updatedUser.cart = updatedUser.cart.filter((item) => item._id !== id); // Remove the item
          return [updatedUser]; // Return the updated user state
        });
  
        // Make the API call to update the backend
        const response = await axios.post(
          `http://localhost:3000/users/removeFCart`,
          {
            id: id,
            email: Cookies.get("email"), // Use the user's email to identify them
          }
        );
  
        if (response.status === 200) {
          toast.success("Item removed from cart successfully!");
        } else {
          toast.error("Failed to remove item from cart.");
        }
      } else {
        toast.warn("Item not found in the cart.");
      }
    } catch (error) {
      console.error("Error removing item from cart:", error);
      toast.error("An error occurred while removing the item from the cart.");
    }
  };
  useEffect(() => {
    allkidsProduct();
  }, [products,item]);

  return (
    <div className="flex gap-2 text-white flex-wrap overflow-y-auto h-full  w-full p-4">
       <div className="absolute top-15 mt-2">
       <select 
       onChange={(e) => setItems(e.target.value)}
       className="p-2  rounded-lg bg-zinc-700 text-white">
         <option value="all">All</option>
         <option value="Goggles">Goggles</option>
         <option value="Shoes">Shoes</option>
         <option value="Clothes">Clothes</option>
         <option value="Belt">Belt</option>
       </select>
     </div>
      {KidProduct.map((item, i) => {
        return (
          <Link
            onClick={() => setProducts(item)}
            key={i}
            className="h-[50%] p-2 rounded-lg inline-block w-[19.5%] bg-zinc-700"
          >
            <img
              className="h-[90%] w-full object-cover"
              src={`data:image/jpeg;base64,${Buffer.from(
                item.image.data
              ).toString("base64")}`}
              alt=""
            />
            <h1 className="text-xl text-center mt-1 text-orange-300">
              {item.name}
            </h1>
          </Link>
        );
      })}
      {products && (
        <div className="h-[80%] p-4 w-[60%] flex gap-6 left-[20%] top-[15%] absolute backdrop-blur-md bg-black bg-opacity-30 rounded-lg">
          <div
            onClick={() => setProducts(null)}
            className="h-[25px] w-[30px] text-center absolute left-[95%] top-[2%] bg-black rounded-2xl text-white cursor-pointer 
                   transition-transform duration-500 ease-in-out hover:scale-110 hover:bg-red-500"
          >
            <i className="ri-close-large-line"></i>
          </div>
          <div className="min-w-[50%] rounded-md overflow-hidden h-[98%] bg-red-400">
            <img
              src={`data:image/jpeg;base64,${Buffer.from(
                products.image.data
              ).toString("base64")}`}
              className="h-full w-full object-cover"
              alt=""
            />
          </div>
          <div>
            <h1 className="text-3xl font-serif  text-orange-300">
              Title:
              <span className="text-xl font-sans text-white align-middle ml-2 ">
                {products.name}
              </span>
            </h1>
            <p className="text-3xl mt-5 font-serif  text-orange-300">
              Description:
              <span className="text-xl text-white font-sans  align-middle ml-2 ">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
                asperiores eos nesciunt ipsam necessitatibus error ipsum
                voluptas expedita sint quos numquam ducimus doloremque,
                obcaecati, fugit quod magnam ex! In, reprehenderit!
              </span>
            </p>
            <h1 className="text-3xl mt-5 font-serif text-orange-300">
              Category:
              <span className="text-xl font-sans  text-white align-middle ml-2 ">
                {products.category}
              </span>
            </h1>
            <h1 className="text-3xl mt-5 font-serif text-orange-300">
              Price:
              <span className="text-xl font-sans  text-white align-middle ml-2 ">
                ${products.price}
              </span>
            </h1>
            <h1 className="text-3xl mt-5 font-serif text-orange-300">
              Discount:
              <span className="text-xl  text-white font-sans align-middle ml-2 ">
                {products.discount}%
              </span>
            </h1>
            {user?.cart?.some(
              (cartItem) => cartItem._id.toString() === products._id.toString()
            ) ? (
              <button
                onClick={() => removeFromtheCart(products._id)}
                type="button"
                className="px-5 py-2 bg-red-500 mt-[10%] rounded-lg text-2xl"
              >
                Remove from Cart!
              </button>
            ) : (
              <button
                onClick={() => addtoCart(products._id)}
                type="button"
                className="px-5 py-2 bg-blue-500 mt-[10%] rounded-lg text-2xl"
              >
                Add to Cart!
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Kids;
