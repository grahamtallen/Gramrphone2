import "./LiveIndicator.css"
import React from 'react';
import { Link } from 'react-router-dom';


export default ({artist}) => {
	return (
		<Link
			className="link-href" 
		  to={{
		    pathname: "/session",
		    search: `?artistName=${artist.name}`,
		  }}
		>
			<div className="live-indicator-wrapper">
				<div className="live-light"></div>
				LIVE
			</div>
		</Link>	
	)
}