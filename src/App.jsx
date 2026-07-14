import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  BrowserRouter,
  Route,
  Switch,
  useLocation,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ArrowUp } from "lucide-react";
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
import CartPage from "./pages/CartPage";
import OrderPage from "./pages/OrderPage";
import PaymentPage from "./pages/PaymentPage";
import PreviousOrdersPage from "./pages/PreviousOrdersPage";
import FavoritesPage from "./pages/FavoritesPage";
import ProfilePage from "./pages/ProfilePage";
import PersonalInfoPage from "./pages/PersonalInfoPage";
import SecurityPage from "./pages/SecurityPage";
import BlogPage from "./pages/BlogPage.jsx";

import { verifyToken } from "./store/actions/clientActions.js";

function ScrollManager() {
  const location = useLocation();
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 400);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!showButton) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Sayfanın başına dön"
      className="fixed bottom-6 right-6 z-[9999] w-12 h-12 rounded-full bg-[#23A6F0] text-white shadow-lg flex items-center justify-center hover:bg-[#1b8fd4] hover:-translate-y-1 transition"
    >
      <ArrowUp size={23} />
    </button>
  );
}

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(verifyToken());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <ScrollManager />

      <Header />

      <Switch>
        <Route exact path="/" component={HomePage} />

        <Route
          path="/shop/:gender/:categoryName/:categoryId/:productNameSlug/:productId"
          component={ProductDetailPage}
        />

        <Route
          path="/shop/:gender/:categoryName/:categoryId"
          component={ShopPage}
        />

        <Route exact path="/shop" component={ShopPage} />

        <Route path="/about" component={AboutPage} />
        <Route path="/contact" component={ContactPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={SignupPage} />

        <Route
          path="/product/:productId"
          component={ProductDetailPage}
        />

        <Route exact path="/cart" component={CartPage} />
        <Route exact path="/order" component={OrderPage} />
        <Route exact path="/payment" component={PaymentPage} />
        <Route
          exact
          path="/orders"
          component={PreviousOrdersPage}
        />
        <Route
          exact
          path="/favorites"
          component={FavoritesPage}
        />
        <Route exact path="/profile" component={ProfilePage} />

        <Route
          path="/profile/personal-info"
          component={PersonalInfoPage}
        />

        <Route
          path="/profile/security"
          component={SecurityPage}
        />

        <Route path="/blog" component={BlogPage} />
      </Switch>

      <Footer />

      <ToastContainer
        position="top-right"
        autoClose={5000}
      />
    </BrowserRouter>
  );
}

export default App;