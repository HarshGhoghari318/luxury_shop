import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
function AddProduct() {
  const [formData, setFormData] = useState({
    image: null,
    price: '',
    discount: '',
    name: '',
    category: 'men',
    subCategory:''
  });

  const handleChange = (e) => {
    const {  type } = e.target;
    setFormData({
      ...formData,
      [e.target.name] : (type === 'file' ? e.target.files[0] : e.target.value),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    data.append("image", formData.image); 
    data.append("price", formData.price);
    data.append("discount", formData.discount);
    data.append("name", formData.name);
    data.append("category", formData.category);
    data.append("subCategory", formData.subCategory);
    
    try {
      const response= await axios.post(`${process.env.REACT_APP_API_URL}/product/create`,data,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      setFormData({
        image: "null",
        price: '',
        discount: '',
        name: '',
        category: 'men',
        subCategory:''
      })
      toast.success(response.data.message,{autoClose:4000});
     
    
    } catch (error) {
      console.log(error);
      
    }
    
  };

  return (
    <>
    <div className="h-full w-full p-4">
      <div className="h-full w-full bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-orange-300 mb-4">Add Product</h2>
        <form onSubmit={handleSubmit} className="space-y-4" method='post'>
          {/* Image Field */}
          <div>
            <label className="block text-orange-300 font-medium mb-2" htmlFor="image">
              Product Image
            </label>
            <input
              type="file"
              name="image"
              id="image"
              accept="image/*"
              onChange={handleChange}
              className="w-full border border-orange-300 bg-gray-900 text-white rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-300"
            />
          </div>

          {/* Name Field */}
          <div>
            <label className="block text-orange-300 font-medium mb-2" htmlFor="name">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-orange-300 bg-gray-900 text-white rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-300"
              placeholder="Enter product name"
              required
            />
          </div>

          {/* Price Field */}
          <div>
            <label className="block text-orange-300 font-medium mb-2" htmlFor="price">
              Price
            </label>
            <input
              type="number"
              name="price"
              id="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full border border-orange-300 bg-gray-900 text-white rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-300"
              placeholder="Enter price"
              required
            />
          </div>

          {/* Discount Field */}
          <div>
            <label className="block text-orange-300 font-medium mb-2" htmlFor="discount">
              Discount (%)
            </label>
            <input
              type="number"
              name="discount"
              id="discount"
              value={formData.discount}
              onChange={handleChange}
              className="w-full border border-orange-300 bg-gray-900 text-white rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-300"
              placeholder="Enter discount percentage"
            />
          </div>

          {/* Category Field */}
          <div>
            <label className="block text-orange-300 font-medium mb-2" htmlFor="category">
              Category
            </label>
            <select
              name="category"
              id="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border border-orange-300 bg-gray-900 text-white rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-300"
            >
              <option value="men">Men</option>
              <option value="women">Women</option>
              <option value="kids">Kids</option>
            </select>
          </div>
          <div>
            <label className="block text-orange-300 font-medium mb-2" htmlFor="category">
              SubCategory
            </label>
            <select
              name="subCategory"
              id="category"
              value={formData.subCategory}
              onChange={handleChange}
              className="w-full border border-orange-300 bg-gray-900 text-white rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-300"
            >
            <option value="goggles">Goggles</option>
            <option value="shoes">Shoes</option>
            <option value="clothes">Clothes</option>
            <option value="belt">Belt</option>
            </select>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-orange-300 text-black font-medium py-2 px-4 rounded-lg hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-300"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
      
    </div>
    
    </>
   
  );
}

export default AddProduct;
