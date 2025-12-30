
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Buffer } from "buffer";





function AllProduct() {
    const [product,setProduct]=useState([])
    const [category,setCategory]=useState("all")

    const allProduct = async () => {

        try {
          const response = await axios.get(`${process.env.VERCEL_URL}/product/sendData`,{
            params: {
              category: category
            }
          });
         
          setProduct(response.data.data);
         
         

        



    }catch (error) {    
        console.log(error)

    }
}
useEffect(()=>{
    allProduct()

},[category])
 


  return (
    <div className="h-full w-full p-4 ">
      <div className="h-full w-full bg-gray-800 p-4 flex flex-col rounded-lg shadow-md">
        <div className="h-[10%]  flex items-center  w-full">
          <h2 className="text-3xl ml-10 font-bold text-orange-300 mb-4">
            All Product
          </h2>
          <span className="absolute left-[78%] text-xl text-orange-300">
            Category:-
          </span>
          <select
            onChange={(e)=>setCategory(e.target.value)}
            name="category"
            id="category"
            className="w-[12%]  ml-[65%] border border-orange-300 h-[65%] bg-gray-900 text-white rounded-lg  focus:outline-none focus:ring-2 focus:ring-orange-300"
          >
            <option value="all">All</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kids">Kids</option>
          </select>
        </div>
        <div className="w-full h-[90%] flex flex-shrink-0 overflow-y-auto flex-wrap gap-3">
            {product.map((item,i)=>{
                return(
                    <div key={i} className="p-4 rounded-md h-[40vh] w-[18vw] bg-zinc-950 mt-2 hover:border-2 ">
                    <img
                      className=" rounded-md overflow-hidden object-cover bg-black h-[70%] w-full"
                      src={`data:image/jpeg;base64,${Buffer.from(item.image.data).toString('base64')}`}
                      alt=""
                    />
                    <h1 className="mt-1 text-orange-300">
                      Name:<span className="text-white text-sm ml-1">{item.name}</span>
                    </h1>
                    <h1 className="mt-1 text-orange-300">
                      Category:<span className="text-white text-sm ml-1">{item.category}</span>
                    </h1>
                    <h4 className="mt-1 text-orange-300">
                      Price:<span className="text-white text-xs ml-1 line-through ">${item.price}/</span><span className=" text-white">${item.price-((item.price*item.discount)/100)}</span>
                      <span className=" ml-2">Discount:</span>
                      <span className="text-white text-sm ml-1">{item.discount}%</span>
                    </h4>
                  </div>
                    
                )
            })}
         
        </div>
      </div>
    </div>
  );
}

export default AllProduct;
