import "./Artists.css";
import React, {Component, Fragment} from 'react';
import LiveIndicator from '../../components/LiveIndicator/LiveIndicator'
import {formatNumber} from 'accounting';

const artists = [
	{
		name: "MonkeyMan",
		followers: 40,
		shows: 13,
		image: "🙉"
	},
	{
		name: "Jeff and the Wingers",
		followers: 73,
		shows: 3,
		image: "👳"
	},
	{
		name: "The Police",
		followers: 48209,
		shows: 248,
		image: "👮",
		isLive: true
	}
]

const allArtists = artists.concat(artists).concat(artists).concat(artists).concat(artists).concat(artists).concat(artists);


const ArtistsColumn = () => {
	return <Fragment>
		{allArtists.map(artist => <ArtistItem artist={artist} />)}
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


class Artists extends Component {
	render() {
		return (
			<div className={`artists-container`}>
				<div className={`side-column column`}>
				</div>
				<div className={`center-column column`}>
					<ArtistsColumn/>
				</div>
				<div className={`side-column column`}>
				</div>
			</div>
		)
	}
}

export default Artists