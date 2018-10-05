import './Session.css'
import React, {Component} from 'react';
import Recorder from '../components/Recorder/Recorder';



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
		return (
			<div className='session-container'>
				<div className="header">
					You are listening to Chaos Chaos
					<SessionButtons />
				</div>
				<div className="footer">
					<Recorder displaySound />
				</div>
			</div>

		)
	}
}