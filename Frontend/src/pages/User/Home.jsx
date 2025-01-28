import React from 'react'
import { Link } from 'react-router-dom'
function Home() {
  return (
   <main className="text-orange-300 bg-zinc-900 container mx-auto p-8">
    {/* Hero Section */}
    <div className="grid grid-cols-2 gap-8">
      {/* Left Column */}
      <div>
        <h1 className="text-6xl font-bold leading-snug">Smooth</h1>
        <p className="text-zinc-200 mt-4">
          Discover the finest collections of fashion for Men, Women, and Kids.
        </p>
      </div>

      {/* Right Column */}
      <div>
        <h1 className="text-6xl font-bold text-right">Movement</h1>
        <p className="text-zinc-200 text-right mt-4">
          Accessories to elevate your daily look.
        </p>
      </div>
    </div>

    {/* Collections */}
    <div className="grid grid-cols-3 gap-6 mt-12">
      {/* Men's Jackets Collection */}
      <div className="col-span-1 bg-gray-200 p-4 rounded-md">
        <img
          src="/m1.jpg"
          alt="Men's Jackets"
          className="rounded-md "
        />
        <h2 className="text-xl font-bold mt-4">Men's Jackets Collection</h2>
        <p className="text-gray-600 mt-2">
          Explore stylish and comfortable jackets for every occasion.
        </p>
        <Link to="/user/men" className="p-2 bg-orange-300 text-white mt-2 rounded-md inline-block">Explore Men </Link>
      </div> 

      {/* Kids Collection */}
      <div className="col-span-1 bg-gray-200 p-4 rounded-md">
        <img
          src="/p4.jpg"
          alt="Kids"
          className="rounded-md"
        />
        <h2 className="text-xl font-bold mt-4">Kids Collection</h2>
        <p className="text-gray-600 mt-2">
          Cute and comfy outfits for the little ones.
        </p>
        <Link to="/user/kids" className="p-2 bg-orange-300 text-white mt-2 rounded-md inline-block" >Explore kids </Link>
      </div>

      {/* Elegant Movement */}
      <div className="col-span-1 bg-gray-200 p-4 rounded-md">
        <img
          src="/g4.jpg"
          alt="Elegant Movement"
          className="rounded-md"
        />
        <h2 className="text-xl font-bold mt-4">women collection</h2>
        <p className="text-gray-600 mt-2">
          Accessories designed to complement your lifestyle.
        </p>
        <Link to="/user/women" className="p-2 bg-orange-300 text-white mt-2 rounded-md inline-block" >Explore Women </Link>
      </div>
    </div>
  </main>
  )
}

export default Home