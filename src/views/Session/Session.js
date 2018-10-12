import './Session.css'
import React, {Component} from 'react';
import Recorder from '../../components/Recorder/Recorder';
const queryString = require('query-string');

const parseQueryString = (location) =>{
	return location && queryString.parse(location.search)
}


const SessionButtons = () => {
	return <div className="session-btn-container">
		<div className="btn-row">
			<button>👍</button>
			<button>🔥</button>
		</div>
	</div>
}


export default class Session extends Component {
	render() {
		const query = parseQueryString(this.props.location);

		return (
			<div className='session-container'>
				<div className="header">
					You are listening to {query && query.artistName}
					<SessionButtons />
				</div>
				<div className="footer">
					<Recorder displaySound />
				</div>
			</div>

		)
	}
}