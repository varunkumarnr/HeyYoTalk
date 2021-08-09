import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import { HomePage } from "./Pages/HomePage";
import Register from "./Components/Register";
import { Login } from "./Components/Login";
function App() {
  return (
    <div className='App'>
      <Provider store={store}>
        <Router>
          <Route exact path='/' component={HomePage}></Route>
          <Switch>
            <Route path='/register' component={Register} />
            <Route path='/login' component={Login} />
          </Switch>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
