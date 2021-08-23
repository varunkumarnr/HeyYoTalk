import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import { HomePage } from "./Pages/HomePage";
import Register from "./Components/Register";
import Login from "./Components/Login";
import setAuthToken from "./util/SetAuthToken";
import { MainPage } from "./Pages/MainPage";
if (localStorage.token) {
  setAuthToken(localStorage.token);
}
function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <div className='App'>
      <Provider store={store}>
        <Router>
          <Route exact path='/' component={HomePage}></Route>
          <Switch>
            <Route path='/register' component={Register} />
            <Route path='/login' component={Login} />
            <Route
              path='/channels/:guild_id/:channel_id'
              component={MainPage}
            />
            <Route path='/channels/@me' component={MainPage} />
          </Switch>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
