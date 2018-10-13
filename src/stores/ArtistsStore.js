import {observable, action} from 'mobx';
import TL from '../services/TransportLayer';


class ArtistsStore {
	@observable loading = false;
	@observable artists = [];
	@observable selectedArtist = false;

	@action
	loadArtists() {
		this.loading = true;
		setTimeout(action(() => {
			this.artists = allArtists;
			this.loading = false;
		}), 1000)
	}

	@action
	async loadArtistByName(artistName) {
		this.loading = true;
		this.selectedArtist = await TL.loadArtistByName(artistName);
		this.loading = false;
	}
}

export const artists = [
	{
		name: "MonkeyMan",
		followers: 40,
		shows: 13,
		image: "🙉",
		isLive: true
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


export default new ArtistsStore()
