import {artists} from '../stores/ArtistsStore';


export default {
	loadArtistByName: (artistName) => {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve(artists.find(artist => artist.name === artistName));
			}, 2000)
		})
	}
}