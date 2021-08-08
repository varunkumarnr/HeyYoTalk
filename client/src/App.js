import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import { HomePage } from "./Pages/HomePage";
function App() {
  return (
    <div className='App'>
      <Provider store={store}>
        <Router>
          <Route path='/' component={HomePage}></Route>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
