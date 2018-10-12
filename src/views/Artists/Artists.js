import "./Artists.css";
import React, {Component, Fragment} from 'react';
import {observer} from 'mobx-react';
import LiveIndicator from '../../components/LiveIndicator/LiveIndicator'
import {formatNumber} from 'accounting';
import ArtistsStore from '../../stores/ArtistsStore';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

const ArtistsColumn = () => {
	return <Fragment>
		{ArtistsStore.artists.map(artist => <ArtistItem artist={artist} />)}
	</Fragment>
}

const ArtistItem = ({artist}) => {
	return (
		<div className="artist-item-container">
			<div className="artist-info">
				<div className="artist-img-container">
					<div className="artist-img">{artist.image}</div>
				</div>
				<div className="artist-details-container">
					<div className="artist-name">{artist.name}</div>
					<div className="artist-followers artist-detail">▶<span>{formatNumber(artist.followers)}</span></div>
					<div className="artist-shows artist-detail">🎤<span>{formatNumber(artist.shows)}</span></div>
				</div>
			</div>
			<div className="artist-item-buttons">
				<button className="follow-btn">+</button>
				{artist.isLive ? <LiveIndicator /> : ""}
			</div>
		</div>
	)
}

@observer
class Artists extends Component {

	componentDidMount() {
		ArtistsStore.loadArtists();
	}

	render() {
		const spinner = (
			<div className="spinner-wrapper">
				<LoadingSpinner/> 
			</div>
		)
		return (
			<div className={`artists-container`}>
				<div className={`side-column column`}>
				</div>
				<div className={`center-column column`}>
					{ArtistsStore.loading ? spinner : <ArtistsColumn/>}
				</div>
				<div className={`side-column column`}>
				</div>
			</div>
		)
	}
}

export default Artists