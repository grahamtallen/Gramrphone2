import "./NavBar.css";
import React from 'react';
import {capitalize} from '../../utils/strings';
import Session from '../../views/Session/Session.js'
import { Link, Redirect } from 'react-router-dom';
import Login from '../../views/Login/Login.js';
import Artists from '../../views/Artists/Artists';
import {observer} from 'mobx-react';
import { withRouter } from 'react-router';
import UiStore from '../../stores/UiStore';

const isCurrentPage = (route, pathname) => {
	if (route.path === pathname.slice(1, pathname.length)) return true;
	else if (route.home) return pathname === "/";
	else return false;
}

@observer
class NavBar extends React.Component {

	toggleSidebar = (e) => {
		const {toggleSidebar} = UiStore;
		e.preventDefault();
		e.stopPropagation();
		toggleSidebar();
	}


	render() {
		const {state} = this;
		const {sidebarOpen} = UiStore;
		const {location} = this.props;
		const {pathname} = location;

		return (
			<div className="top-bar">
				<div className="wide-screen-nav">
			        {
			        	routes.map((route) => {
			        		return (
			        			<Link className="link-href" to={route.path}>
				        			<div className={`link-btn wide-screen ${isCurrentPage(route, pathname) && "is-active"} `}>
				        					{capitalize(route.path)}
			        				</div>
			        			</Link>
			        		)
			        	})
			        }
		        </div>
		        <div className="small-screen-nav">
			        <button className="w3-button hamburger-btn" onClick={this.toggleSidebar}>&#9776;</button>
			        <div className="current-page">{capitalize(pathname.slice(1, pathname.length))}</div>
					<div className="w3-sidebar w3-bar-block w3-collapse w3-card w3-animate-left" style={{width: "200px", display: sidebarOpen ? "block" : "none"}}>
					  <button className="w3-bar-item w3-button w3-large w3-hide-large" onClick={this.toggleSidebar} >Close &times;</button>
					 	{
				        	routes.map((route) => {
				        		return (
				        			<Link 
				        				className="link-href" 
				        				to={route.path} 
			        				>
					        			<div className={`link-btn ${isCurrentPage(route, pathname) && "is-active"} `}>
					        					{capitalize(route.path)}
				        				</div>
				        			</Link>
				        		)
				        	})
			        	}
					</div>
				</div>
		    </div>
		)
	}
}


const Topic = ({ match }) => (
  <div>
    <h3>{match.url}</h3>
  </div>
)


export const routes = [
	{
		path: "session",
		home: true,
		exact: true,
		component: Session
	},
	{
		path: "artists",
		component: Artists
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


export default withRouter(NavBar)


