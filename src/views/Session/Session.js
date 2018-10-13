import './Session.css'
import React, {Component} from 'react';
import {observer} from 'mobx-react';
import Recorder from '../../components/Recorder/Recorder';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import ArtistsStore from '../../stores/ArtistsStore';
import {ArtistItem} from '../../views/Artists/Artists';

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

@observer
export default class Session extends Component {

	componentDidMount() {
		const query = parseQueryString(this.props.location);
		if (query.artistName) {
			ArtistsStore.loadArtistByName(query.artistName);
		}
	}	

	render() {
		const query = parseQueryString(this.props.location);
		if (ArtistsStore.loading) return (
			<div className="spinner-wrapper">
				<LoadingSpinner/>
			</div>
		)

		if (!ArtistsStore.selectedArtist) {
			return (<div>
				Please select an artist from the Artists page
			</div>)
		}
		return (
			<div className='session-container'>
				<div className="header">
					You are listening to {ArtistsStore.selectedArtist && ArtistsStore.selectedArtist.name}
					<SessionButtons />
				</div>
				<div className="footer">
					<Recorder displaySound={true} />
				</div>
				<div className="artist-card">
					<ArtistItem artist={ArtistsStore.selectedArtist} />
				</div>
			</div>

		)
	}
}