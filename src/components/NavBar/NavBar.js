import "./NavBar.css";
import React from 'react';
import {capitalize} from '../../utils/strings';
import Session from '../../views/Session.js'
import { Link, Redirect } from 'react-router-dom';
import Login from '../../views/Login/Login.js';
export const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    this.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

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


export default class NavBar extends React.Component {

	state = {
		sidebarOpen: false
	}

	toggleSidebar = () => {
		this.setState({sidebarOpen: !this.state.sidebarOpen})
	}


	render() {
		const {state} = this;
		const {sidebarOpen} = state;
		return (
			<div className="top-bar">
				<div className="wide-screen-nav">
			        {
			        	routes.map((route) => {
			        		return (
			        			<div className={`link-btn`}>
			        				<Link to={route.home ? "/" : route.path}>
			        					{capitalize(route.path)}
			        				</Link>
		        				</div>
			        		)
			        	})
			        }
		        </div>
		        <div className="small-screen-nav">
			        <button className="w3-button hamburger-btn" onClick={this.toggleSidebar}>&#9776;</button>
					<div className="w3-sidebar w3-bar-block w3-collapse w3-card w3-animate-left" style={{width: "200px", display: sidebarOpen ? "block" : "none"}}>
					  <button className="w3-bar-item w3-button w3-large w3-hide-large" onClick={this.toggleSidebar} >Close &times;</button>
					 {
			        	routes.map((route) => {
			        		return (
			        			<div className={`w3-bar-item w3-button link-btn`}>
			        				<Link to={route.home ? "/" : route.path} onClick={this.toggleSidebar}>
			        					{capitalize(route.path)}
			        				</Link>
		        				</div>
			        		)
			        	})
			        }
					</div>
				</div>
		    </div>
		)
	}
}

export const routes = [
	{
		path: "session",
		home: true,
		exact: true,
		component: Session
	},
	{
		path: "artists",
		component: About
	},
	{
		path: "chat",
		component: Topic
	},
	{
		path: "login",
		component: Login,
		public: true
	}
]




