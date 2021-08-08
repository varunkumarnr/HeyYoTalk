import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import { HomePage } from "./Pages/HomePage";
function App() {
  return (
    <div className='App'>
      <Router>
        <Route path='/' component={HomePage}></Route>
      </Router>
    </div>
  );
}

export default App;
