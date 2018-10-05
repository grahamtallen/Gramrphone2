import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom';
import NavBar, {routes, fakeAuth} from './components/NavBar/NavBar';
import './App.css';


const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      fakeAuth.isAuthenticated ? (
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
        console.log(route);
        return (
            <Route {...route}  path={route.home ? "/" : "/" + route.path} />
        )
      })}
    </div>
  </Router>
)
export default App