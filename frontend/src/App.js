import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import Review from './components/Review/Review';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Shipment from './components/Shipment/Shipment';
import Inventory from './components/Inventory/Inventory';
import { createContext, useState } from 'react';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <h3>Email: {loggedInUser.email}</h3>
      <Router>
        <Header />
        <Switch>
          <Route exact path='/'>
            <Shop />
          </Route>
          <Route path='/shop'>
            <Shop />
          </Route>
          <Route path='/review'>
            <Review />
          </Route>
          <PrivateRoute path='/inventory'>
            <Inventory />
          </PrivateRoute>
          <Route path='/login'>
            <Login />
          </Route>
          <PrivateRoute path='/shipment'>
            <Shipment />
          </PrivateRoute>
          <Route path='*'>
            <h1>404 under construction</h1>
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
