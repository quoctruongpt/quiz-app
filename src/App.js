import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import List from "./component/List";
import Detail from "./component/Detail";
import AddEdit from "./component/AddEdit";
import AddLevel from "./component/AddLevel";
import Navbar from "./component/Navbar";
import HomePage from "./component/HomePage"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Switch>
        <Route path="/list" exact component={List} />
        <Route path="/detail/:idLevel" component={Detail} />
        <Route path="/add-edit/:idLevel" component={AddEdit} />
        <Route path="/add-level/:idLevel" component={AddLevel} />
        <Route path="/" exact component={HomePage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
