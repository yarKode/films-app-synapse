import "./App.scss";
import Home from "./pages/Home";
import { Route } from "react-router";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Browse from "./pages/Browse";
import { AppProvider } from "./contexts/AppContext";

function App() {
  return (
    <>
      <AppProvider>
        <Route exact path="/" component={Home} />
        <Route path="/browse" component={Browse} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
      </AppProvider>
    </>
  );
}

export default App;
