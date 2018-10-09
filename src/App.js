import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom';
import NavBar, {routes} from './components/NavBar/NavBar';
import AuthStore from './stores/AuthStore'


const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      AuthStore.isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);


const App = () => (
  <Router>
    <div>
      <NavBar />
      {routes.map(route => {
        if (!route.public) {
          return (
            <PrivateRoute {...route}  path={route.home ? "/" : "/" + route.path} />
          )
        }
        return (
            <Route {...route}  path={route.home ? "/" : "/" + route.path} />
        )
      })}
    </div>
  </Router>
)
export default App