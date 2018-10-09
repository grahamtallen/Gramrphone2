import "./LiveIndicator.css"
import React from 'react';


export default ({artist}) => {
	return (
		<div className="live-indicator-wrapper">
			<div className="live-light"></div>
			LIVE
		</div>
	)
}