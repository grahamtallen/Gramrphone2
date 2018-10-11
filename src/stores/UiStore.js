import {observable, action} from 'mobx';

class UiStore {
	@observable sidebarOpen = false;

	@action
	toggleSidebar = () => {
				console.log("toggling sidebar")
		this.sidebarOpen = !this.sidebarOpen;
	}

	@action
	closeSidebar = () => {
		console.log("closing sidebar")
		this.sidebarOpen = false;
	}
}

export default new UiStore();