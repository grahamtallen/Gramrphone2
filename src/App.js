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
import UiStore from './stores/UiStore'

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
      <div className="routes-wrapper" onClick={UiStore.closeSidebar}>
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
    </div>
  </Router>
)
export default App