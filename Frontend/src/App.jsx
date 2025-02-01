import { Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Kids from "./pages/Kids";
import Men from "./pages/Men";
import Women from "./pages/Women";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import User from "./pages/User/User";
import Home from "./pages/User/Home";
import Cart from "./pages/User/Cart";
import Profile from "./pages/User/Profile";
import Owner from "./pages/Owner/Owner.jsx";
import AddProduct from "./pages/Owner/AddProduct.jsx";
import AllProduct from "./pages/Owner/AllProduct";
import AllUsers from "./pages/Owner/AllUsers";
import EditProfile from "./pages/User/EditProfile";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />}>
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/user" element={<User />}>
        <Route path="home" element={<Home />} />
        <Route path="men" element={<Men />} />
        <Route path="women" element={<Women />} />
        <Route path="kids" element={<Kids />} />
      </Route>
      <Route path="/profile" element={<Profile />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/owner" element={<Owner />}>
        <Route path="addProduct" element={<AddProduct />} />
        <Route path="users" element={<AllUsers />} />
        <Route path="allProduct" element={<AllProduct />} />
        {/* <Route path="editProduct" element={<EditProduct/>} /> */}
      </Route>
      <Route path="/Eprofile" element={<EditProfile/>}/>
    </Routes>
  );
}

export default App;
