import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { activeContext } from "../utils/Context.jsx"; // Corrected import

function Main() {
  const { active, setActive } = useContext(activeContext); // Consume context
  
  return (
    <>
      <div className="flex flex-col h-screen w-full bg-zinc-900">
        <div
          id="shop"
          className="flex justify-between items-center gap-3 border-t-2 border-b-2 border-orange-300 p-4 mt-2 h-[12%] w-full"
        >
          <img
            className="ml-5 object-cover rounded-3xl h-[70px] w-[120px]"
            src="/Logo.jpg"
            alt="Logo"
          />
          <ul className="text-orange-300 flex gap-3">
            <a
              href="#shop"
              onClick={() => setActive("shop")}
              to="shop"
              className={` ${
                active === "shop" ? "active" : ""
              } rounded-full text-xl hover:text-2xl p-2 `}
            >
              Shop
            </a>
            <a
              href="#men"
              onClick={() => setActive("men")}
              to="men"
              className={` ${
                active === "men" ? "active" : ""
              } hover:text-2xl rounded-full text-xl p-2`}
            >
              Men
            </a>
            <a
              href="#women"
              onClick={() => setActive("women")}
              to="women"
              className={` ${
                active === "women" ? "active" : ""
              } hover:text-2xl rounded-full text-xl p-2`}
            >
              Women
            </a>
            <a
              href="#kids"
              onClick={() => setActive("kids")}
              to="kids"
              className={` ${
                active === "kids" ? "active" : ""
              } hover:text-2xl rounded-full text-xl p-2`}
            >
              Kids
            </a>
          </ul>
          <div className="flex mr-5 gap-3">
            <Link
              to={"/login"}
              className="px-5 text-orange-300 hover:bg-orange-300 hover:text-white rounded-full py-3 bg-zinc-200"
            >
              LOG IN
            </Link>
            <Link
              to={"/signup"}
              className="px-5 text-orange-300 hover:bg-orange-300 hover:text-white rounded-full py-3 bg-zinc-200"
            >
              SIGN UP
            </Link>
          </div>
        </div>
        <div className="w-full h-full py-5   text-white">
          <div
            className="p-4  "
            style={{
              backgroundImage: `url('/main.jpg')`,
              backgroundPosition: "cover",
              objectFit: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              height: "100%",
              width: "100%",
              backgroundColor: "white",
            }}
          >
            <div className="ml-[40%]">
              <h1 className="text-orange-300 ml-5 text-[45px] font-serif font-semibold">
                LUXURY SHOPPING <br></br>
              </h1>
              <p className="text-orange-300 ml-5 hover:text-white ">
                At [Brand Name], we believe in the art of timeless elegance. Our
                luxury clothing line embodies sophisticated craftsmanship,
                <br />
                exquisite materials, and attention to detail. Designed for those
                who appreciate refinement and exclusivity, each piece is a
                master
                <br />
                piece created with the finest fabrics sourced from around the
                world. Our collections seamlessly blend contemporary style with
                class
                <br />
                ic charm, offering meticulously tailored garments that elevate
                every moment. From tailored suits to flowing evening gowns,
                every design is an expression of luxury, comfort, and style that
                transcends seasons and trends. Whether you're attending a
                high-profile even
                <br />
                t, exploring new horizons, or indulging in everyday luxury,
                [Brand Name] provides an unparalleled experience in luxury
                fashion. Crafted for the discerning, our pieces make a statement
                of impeccable taste and refined style. Step into the world of{" "}
                <br />
                [Brand Name]—where luxury is not just a label, but a way of
                life.e.
              </p>
              <h4 className="ml-4 mt-[20%] text-xl font-semibold font-serif text-orange-300">
                click below for the Login for easy shoppping!
              </h4>
              <Link
                onClick={() => setActive("shop")}
                to={"/login"}
                className="ml-3 inline-block mt-[1%] rounded-sm text-2xl px-6 py-1 border-2 border-orange-300 text-orange-300 hover:text-white hover:bg-orange-300 "
              >
                Login
              </Link>
            </div>
          </div>
        </div>
        {/* <Outlet /> */}
      </div>
      <div id="kids" className="h-screen text-white w-full bg-black">
        
        <h1 className="p-8 flex text-orange-300 border-orange-300 items-center justify-center text-5xl border-t-2 border-b-2 font-semibold ">
        <span className="absolute top-50 left-10"><a href="#shop"><i class="ri-arrow-left-line"></i></a></span> KID'S WEAR
        </h1>
        <h1 className="mt-2 text-orange-300 w-[90%] ml-[10%]">
          "Explore our delightful Kids Collection, crafted with care and
          creativity to bring joy to your little ones. From playful everyday
          outfits to charming formal wear, our range combines comfo
          <br />
          rt, quality,, and style. Designed for durability and ease of movement,
          each piece ensures your child feels as amazing as they look. Discover
          clothing that makes every moment magical!"
        </h1>
        <h1 className="text-2xl mt-1">*most saled</h1>
        <div className="w-full h-[45%] rounded-md overflow-hidden mt-4 gap-5 p-4 flex flex-shrink-0  ">
          <div className="w-[15%] ">
            <img
              src="/p2.jpg"
              alt="Kids Product"
              className="w-full h-[200px] object-cover rounded-t-lg"
            />
            <h3 className="text-lg font-semibold text-orange-300 mt-3">
              louis vitton white T-Shirt
            </h3>
            <p className="text-sm text-gray-600">
              Comfortable cotton tee with superhero design.
            </p>
            <p className="text-xl font-bold mt-2 ">
              <span className="line-through mr-2">$20</span>$15
            </p>
          </div>
          <div className="w-[15%] ">
            <img
              src="/p3.jpg"
              alt="Kids Product"
              className="w-full h-[200px] object-cover rounded-t-lg"
            />
            <h3 className="text-lg font-semibold text-orange-300 mt-3">
              louis vitton black T-Shirt
            </h3>
            <p className="text-sm text-gray-600">
              Comfortable cotton tee with superhero design.
            </p>
            <p className="text-xl font-bold mt-2 ">
              <span className="line-through mr-2">$20</span>$15
            </p>
          </div>
          <div className="w-[15%] ">
            <img
              src="/p4.jpg"
              alt="Kids Product"
              className="w-full h-[200px] object-cover rounded-t-lg"
            />
            <h3 className="text-lg font-semibold text-orange-300 mt-3">
              Louis Tomlinson T-Shirt
            </h3>
            <p className="text-sm text-gray-600">
              Comfortable cotton tee with superhero design.
            </p>
            <p className="text-xl font-bold mt-2 ">
              <span className="line-through mr-2">$20</span>$15
            </p>
          </div>

          <div className="w-[15%]  ">
            <img
              src="/p5.jpg"
              alt="Kids Product"
              className="w-full h-[200px] object-cover rounded-t-lg"
            />
            <h3 className="text-lg font-semibold  text-orange-300 mt-3">
              Louis Vuitton Kids T-Shirt
            </h3>
            <p className="text-sm text-gray-600">
              Comfortable cotton tee with superhero design.
            </p>
            <p className="text-xl font-bold mt-2 ">
              <span className="line-through mr-2">$20</span>$15
            </p>
          </div>
          <div className="w-[15%]  ">
            <img
              src="/p6.jpg"
              alt="Kids Product"
              className="w-full h-[200px] object-cover rounded-t-lg"
            />
            <h3 className="text-lg font-semibold text-orange-300 mt-3">
              Burberry Kids clothing
            </h3>
            <p className="text-sm text-gray-600">
              Comfortable cotton tee with superhero design.
            </p>
            <p className="text-xl font-bold mt-2 ">
              <span className="line-through mr-2">$20</span>$15
            </p>
          </div>
          <div className="w-[15%]  ">
            <img
              src="/p7.jpg"
              alt="Kids Product"
              className="w-full h-[200px] object-cover rounded-t-lg"
            />
            <h3 className="text-lg text-orange-300 font-semibold mt-3">
              Louis Vuitton Jacket
            </h3>
            <p className="text-sm text-gray-600">
              Comfortable cotton tee with superhero design.
            </p>
            <p className="text-xl font-bold mt-2 ">
              <span className="line-through mr-2">$20</span>$15
            </p>
          </div>
        </div>
      </div>
      <div id="men" className="h-screen text-white w-full bg-black">
      <h1 className="p-8 flex text-orange-300 border-orange-300 items-center justify-center text-5xl border-t-2 border-b-2 font-semibold ">
      <span className="absolute top-50 left-10"><a href="#shop"><i class="ri-arrow-left-line"></i></a></span> MEN'S WEAR
      </h1>
        <h1 className="mt-2 text-orange-300 w-[90%] ml-[10%]">
          "Explore our delightful Mens Collection, crafted with care and
          creativity to bring joy to your little ones. From playful everyday
          outfits to charming formal wear, our range combines comfo
          <br />
          rt, quality,, and style. Designed for durability and ease of movement,
          each piece ensures your child feels as amazing as they look. Discover
          clothing that makes every moment magical!"
        </h1>
        <h1 className="text-2xl mt-1">*most saled</h1>
        <div className="w-full h-[45%] rounded-md overflow-hidden mt-4 gap-5 p-4 flex flex-shrink-0  ">
          <div className="w-[15%] ">
            <img
              src="/m1.jpg"
              alt="Kids Product"
              className="w-full h-[200px] object-cover rounded-t-lg"
            />
            <h3 className="text-lg font-semibold text-orange-300 mt-3">
              louis vitton white T-Shirt
            </h3>
            <p className="text-sm text-gray-600">
              Comfortable cotton tee with superhero design.
            </p>
            <p className="text-xl font-bold mt-2 ">
              <span className="line-through mr-2">$20</span>$15
            </p>
          </div>
          <div className="w-[15%] ">
            <img
              src="/m2.jpg"
              alt="Kids Product"
              className="w-full h-[200px] object-cover rounded-t-lg"
            />
            <h3 className="text-lg font-semibold text-orange-300 mt-3">
              louis vitton black T-Shirt
            </h3>
            <p className="text-sm text-gray-600">
              Comfortable cotton tee with superhero design.
            </p>
            <p className="text-xl font-bold mt-2 ">
              <span className="line-through mr-2">$20</span>$15
            </p>
          </div>
          <div className="w-[15%] ">
            <img
              src="/m7.jpg"
              alt="Kids Product"
              className="w-full h-[200px] object-cover rounded-t-lg"
            />
            <h3 className="text-lg font-semibold text-orange-300 mt-3">
              Louis Tomlinson T-Shirt
            </h3>
            <p className="text-sm text-gray-600">
              Comfortable cotton tee with superhero design.
            </p>
            <p className="text-xl font-bold mt-2 ">
              <span className="line-through mr-2">$20</span>$15
            </p>
          </div>

          <div className="w-[15%]  ">
            <img
              src="/m4.jpg"
              alt="Kids Product"
              className="w-full h-[200px] object-cover rounded-t-lg"
            />
            <h3 className="text-lg font-semibold  text-orange-300 mt-3">
              Louis Vuitton Kids T-Shirt
            </h3>
            <p className="text-sm text-gray-600">
              Comfortable cotton tee with superhero design.
            </p>
            <p className="text-xl font-bold mt-2 ">
              <span className="line-through mr-2">$20</span>$15
            </p>
          </div>
          <div className="w-[15%]  ">
            <img
              src="/m5.jpg"
              alt="Kids Product"
              className="w-full h-[200px] object-cover rounded-t-lg"
            />
            <h3 className="text-lg font-semibold text-orange-300 mt-3">
              Burberry Kids clothing
            </h3>
            <p className="text-sm text-gray-600">
              Comfortable cotton tee with superhero design.
            </p>
            <p className="text-xl font-bold mt-2 ">
              <span className="line-through mr-2">$20</span>$15
            </p>
          </div>
          <div className="w-[15%]  ">
            <img
              src="/m6.jpg"
              alt="Kids Product"
              className="w-full h-[200px] object-cover rounded-t-lg"
            />
            <h3 className="text-lg text-orange-300 font-semibold mt-3">
              Louis Vuitton Jacket
            </h3>
            <p className="text-sm text-gray-600">
              Comfortable cotton tee with superhero design.
            </p>
            <p className="text-xl font-bold mt-2 ">
              <span className="line-through mr-2">$20</span>$15
            </p>
          </div>
        </div>
      </div>
      <div id="women" className="h-screen text-white w-full bg-black">
      <h1 className="p-8 flex text-orange-300 border-orange-300 items-center justify-center text-5xl border-t-2 border-b-2 font-semibold ">
      <span className="absolute top-50 left-10"><a href="#shop"><i class="ri-arrow-left-line"></i></a></span>WOMEN'S WEAR
        </h1>
        <h1 className="mt-2 text-orange-300 w-[90%] ml-[10%]">
          "Explore our delightful Women's Collection, crafted with care and
          creativity to bring joy to your little ones. From playful everyday
          outfits to charming formal wear, our range combines comfo
          <br />
          rt, quality,, and style. Designed for durability and ease of movement,
          each piece ensures your child feels as amazing as they look. Discover
          clothing that makes every moment magical!"
        </h1>
        <h1 className="text-2xl mt-1">*most saled</h1>
        <div className="w-full h-[45%] rounded-md overflow-hidden mt-4 gap-5 p-4 flex flex-shrink-0  ">
          <div className="w-[15%] ">
            <img
              src="/g1.jpg"
              alt="Kids Product"
              className="w-full h-[200px] object-cover rounded-t-lg"
            />
            <h3 className="text-lg font-semibold text-orange-300 mt-3">
              louis vitton white T-Shirt
            </h3>
            <p className="text-sm text-gray-600">
              Comfortable cotton tee with superhero design.
            </p>
            <p className="text-xl font-bold mt-2 ">
              <span className="line-through mr-2">$20</span>$15
            </p>
          </div>
          <div className="w-[15%] ">
            <img
              src="/g2.jpg"
              alt="Kids Product"
              className="w-full h-[200px] object-cover rounded-t-lg"
            />
            <h3 className="text-lg font-semibold text-orange-300 mt-3">
              louis vitton black T-Shirt
            </h3>
            <p className="text-sm text-gray-600">
              Comfortable cotton tee with superhero design.
            </p>
            <p className="text-xl font-bold mt-2 ">
              <span className="line-through mr-2">$20</span>$15
            </p>
          </div>
          <div className="w-[15%] ">
            <img
              src="/g3.jpg"
              alt="Kids Product"
              className="w-full h-[200px] object-cover rounded-t-lg"
            />
            <h3 className="text-lg font-semibold text-orange-300 mt-3">
              Louis Tomlinson T-Shirt
            </h3>
            <p className="text-sm text-gray-600">
              Comfortable cotton tee with superhero design.
            </p>
            <p className="text-xl font-bold mt-2 ">
              <span className="line-through mr-2">$20</span>$15
            </p>
          </div>

          <div className="w-[15%]  ">
            <img
              src="/g4.jpg"
              alt="Kids Product"
              className="w-full h-[200px] object-cover rounded-t-lg"
            />
            <h3 className="text-lg font-semibold  text-orange-300 mt-3">
              Louis Vuitton Kids T-Shirt
            </h3>
            <p className="text-sm text-gray-600">
              Comfortable cotton tee with superhero design.
            </p>
            <p className="text-xl font-bold mt-2 ">
              <span className="line-through mr-2">$20</span>$15
            </p>
          </div>
          <div className="w-[15%]  ">
            <img
              src="/g5.jpg"
              alt="Kids Product"
              className="w-full h-[200px] object-cover rounded-t-lg"
            />
            <h3 className="text-lg font-semibold text-orange-300 mt-3">
              Burberry Kids clothing
            </h3>
            <p className="text-sm text-gray-600">
              Comfortable cotton tee with superhero design.
            </p>
            <p className="text-xl font-bold mt-2 ">
              <span className="line-through mr-2">$20</span>$15
            </p>
          </div>
          <div className="w-[15%]  ">
            <img
              src="/g6.jpg"
              alt="Kids Product"
              className="w-full h-[200px] object-cover rounded-t-lg"
            />
            <h3 className="text-lg text-orange-300 font-semibold mt-3">
              Louis Vuitton Jacket
            </h3>
            <p className="text-sm text-gray-600">
              Comfortable cotton tee with superhero design.
            </p>
            <p className="text-xl font-bold mt-2 ">
              <span className="line-through mr-2">$20</span>$15
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
