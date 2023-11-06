import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Resetpassword from "./pages/Resetpassword";
import Forgotpassword from "./pages/Forgotpassword";
import SignUp from "./pages/SignUp";
import MainLayout from "./components/MainLayout";
import Orders from "./pages/Orders";
import Customers from "./pages/Customers";
import Productlist from "./pages/Productlist";
import ViewOrder from "./pages/ViewOrder";
import StandardDetailForm from "./components/StandardForm";
import SpecialDetailForm from "./components/SpecialService";
import LaundryService from "./pages/LaundryService";
function App() {
  return (
    <Router>
      <Routes>
      
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/reset-password" element={<Resetpassword />} />
        <Route path="/forgot-password" element={<Forgotpassword />} />
        <Route path="/admin" element={<MainLayout />}>       
          <Route index element={<Dashboard />} />          
          <Route path="orders" element={<Orders />} />
          <Route path="order/:id" element={<ViewOrder />} />
          <Route path="customers" element={<Customers />} />
          <Route path="list-product" element={<Productlist />} />
          <Route path="laundry" element={<LaundryService />} />
          <Route path="list-product/add" element={<SpecialDetailForm />} />
          <Route path="list-product/update/:id" element={<SpecialDetailForm />} />
          <Route path="special-service/add" element={<StandardDetailForm />} />
          <Route path="special-service/update/:id" element={<StandardDetailForm />} />

        </Route>
      </Routes>
    </Router> 
  );
}

export default App;