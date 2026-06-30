import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "./layout/Header";
import Footer from "./layout/Footer";

import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ProductDetailPage from "./pages/ProductDetailPage";

import { verifyToken } from "./store/actions/clientActions.js";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(verifyToken());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Header />

      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/shop" component={ShopPage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/contact" component={ContactPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={SignupPage} />
        <Route path="/product/:productId" component={ProductDetailPage} />
      </Switch>

      <Footer />

      <ToastContainer position="top-right" autoClose={5000} />
    </BrowserRouter>
  );
}

export default App;