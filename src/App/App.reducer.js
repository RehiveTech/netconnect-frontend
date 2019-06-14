import { RESET_STORE, SET_APP_LOADED, SET_CONFIGURATION, SET_DHCP_SETTINGS, SET_WIFI_DHCP_SETTINGS} from "./App.actions";

/**
 * App Initial State
 * @type {{appLoaded: boolean, loggedMember: boolean, url: string, appMessage: null}}
 */
const INITIAL_STATE = {
	appLoaded: false,
	config: {},
	DHCPSettings: {
		lan_dns1: null,
		lan_dns2: null,
		lan_gw: null,
		lan_ip: null,
		lan_netmask: null,
	},
	WiFiDHCPSettings:{
		wifi_dns1: null,
		wifi_dns2: null,
		wifi_gw: null,
		wifi_ip: null,
		wifi_netmask: null,
	}
};

/**
 * Main App Reducer
 * @param state
 * @param action
 * @returns {*}
 */
export function appReducer (state: Object = INITIAL_STATE, action: any) {

	switch (action.type) {
		case SET_APP_LOADED:
			return Object.assign({}, state, {
				appLoaded: action.status
			});
		case SET_CONFIGURATION:
			return Object.assign({}, state, {
				config: action.config
			});
		case SET_DHCP_SETTINGS:
			return Object.assign({}, state, {
				DHCPSettings: action.config
			});
		case SET_WIFI_DHCP_SETTINGS:
			return Object.assign({}, state, {
				WiFiDHCPSettings: action.config
			});
		case RESET_STORE:
			return INITIAL_STATE;
		default:
			return state;
	}
}