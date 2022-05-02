import Navbar from "./components/Navbar";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Prods from "./components/Products";
import Orders from "./pages/Orders";
import {BrowserRouter as Router,Route,Routes,Link, Navigate} from "react-router-dom";
import { useSelector } from "react-redux";
import CreatePost from "./adminPage/pages/createPost";
import UpdateProduct from "./adminPage/pages/updateProduct";
 
const App = () => {
  let login = JSON.parse(localStorage.getItem('userLogin'));
  console.log(login);

  
  return <Router>
    <Routes>
      <Route path="/" element={ login ? <Home/> : <Navigate to={"/login"} replace={true} />} />
      <Route path="/products/:category" element={<ProductList/>}></Route>
      <Route path="/product/:id" element={<Product/>}></Route>
      <Route path="/cart" element={<Cart/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/register" element={<Register/>}></Route>
      <Route path="/admin/createpost" element={<CreatePost/>}></Route>
      <Route path="/admin/update/:id" element={<UpdateProduct/>}></Route>
      <Route path="/user/orders" element={<Orders/>}></Route>
      {/* <Route path="/allproducts" element={<Prods/>}></Route> */}
      {/* <Route path="/admin/Login" element={<AdminLogin/>}></Route> */}
    </Routes>
  </Router>
 
};

export default App;