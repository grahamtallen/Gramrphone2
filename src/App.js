import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import NavBar, {routes} from './components/NavBar/NavBar';
import './App.css';



const App = () => (
  <Router>
    <div>
      <NavBar />
      {routes.map(route => {
        console.log(route.path)
        return (
            <Route {...route}  path={route.home ? "/" : "/" + route.path} />
        )
      })}
    </div>
  </Router>
)
export default App