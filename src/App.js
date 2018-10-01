import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import './App.css'

import Session from './views/Session.js'

const About = () => (
  <div>
    <h2>About</h2>
  </div>
)

const Topic = ({ match }) => (
  <div>
    <h3>{match.url}</h3>
  </div>
)


const App = () => (
  <Router>
    <div>
      <div className="top-bar">
        <div className="link-btn"><Link to="/">Session</Link></div>
        <div className="link-btn"><Link to="/about">Artists</Link></div>
        <div className="link-btn"><Link to="/topics">Chat</Link></div>
      </div>

      <Route exact path="/" component={Session}/>
      <Route path="/about" component={About}/>
      <Route path="/topics" component={Topic}/>
    </div>
  </Router>
)
export default App