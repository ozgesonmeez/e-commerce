import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
  useLocation,
} from "react-router-dom";
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

import CartPage from "./pages/CartPage";
import FavoritesPage from "./pages/FavoritesPage";

import OrderPage from "./pages/OrderPage";
import PaymentPage from "./pages/PaymentPage";
import PreviousOrdersPage from "./pages/PreviousOrdersPage";
import OrderSuccessPage from "./pages/OrderSuccessPage";

import ProfilePage from "./pages/ProfilePage";
import PersonalInfoPage from "./pages/PersonalInfoPage";
import SecurityPage from "./pages/SecurityPage";
import ScrollToTopButton from "./components/ScrollToTopButton";
import { verifyToken } from "./store/actions/clientActions.js";

function ProtectedRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        const token = localStorage.getItem("token");

        if (!token) {
          return <Redirect to="/login" />;
        }

        return <Component {...props} />;
      }}
    />
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  return null;
}

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(verifyToken());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <ScrollToTop />
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

        <Route
          exact
          path="/product/:productId"
          component={ProductDetailPage}
        />

        <Route exact path="/about" component={AboutPage} />
        <Route exact path="/contact" component={ContactPage} />

        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/signup" component={SignupPage} />

        <Route exact path="/cart" component={CartPage} />
        <Route exact path="/favorites" component={FavoritesPage} />

        <ProtectedRoute exact path="/order" component={OrderPage} />
        <ProtectedRoute exact path="/payment" component={PaymentPage} />
        <ProtectedRoute exact path="/orders" component={PreviousOrdersPage} />
        <ProtectedRoute exact path="/order-success" component={OrderSuccessPage} />

        <ProtectedRoute exact path="/profile" component={ProfilePage} />
        <ProtectedRoute
          exact
          path="/profile/personal-info"
          component={PersonalInfoPage}
        />
        <ProtectedRoute
          exact
          path="/profile/security"
          component={SecurityPage}
        />
      </Switch>
<ScrollToTopButton />
      <Footer />

      <ToastContainer position="top-right" autoClose={5000} />
    </BrowserRouter>
  );
}

export default App;