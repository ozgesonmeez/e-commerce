import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./layout/Header";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Switch>
        <Route exact path="/" component={HomePage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;