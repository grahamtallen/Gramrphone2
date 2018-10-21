import {observable, action} from 'mobx';

class UiStore {
	@observable sidebarOpen = false;

	@action
	toggleSidebar = () => {
		this.sidebarOpen = !this.sidebarOpen;
	}

	@action
	closeSidebar = () => {
		this.sidebarOpen = false;
	}
}

export default new UiStore();