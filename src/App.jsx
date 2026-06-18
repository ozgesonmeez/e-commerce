import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./layout/Header";

import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import LoginPage from "./pages/LoginPage";
import ProductDetailPage from "./pages/ProductDetailPage";
function App() {
  return (
    <BrowserRouter>
      <Header />

      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/shop" component={ShopPage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/contact" component={ContactPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/product/:productId" component={ProductDetailPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;