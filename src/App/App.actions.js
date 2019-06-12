export const SET_APP_LOADED = "@@NETCONNECT/SET_APP_LOADED";
export const RESET_STORE = "@@NETCONNECT/RESET_STORE";
export const SET_DHCP_SETTINGS = "@@NETCONNECT/SET_DHCP_SETTINGS";
export const SET_CONFIGURATION = "@@NETCONNECT/SET_CONFIGURATION";


/**
 * Set App Loaded
 * @param status
 * @returns {{type: string, status: boolean}}
 */
export function setAppLoaded(status: boolean) {
    return {type: SET_APP_LOADED, status};
}

/**
 * Set Configuration to store
 * @param config
 * @return {{type: string, config: Object}}
 */
export function setConfiguration (config: Object) {
	return {type: SET_CONFIGURATION, config};
}

/**
 * Set DHCP to store
 * @param config
 * @return {{type: string, config: Object}}
 */
export function setDHCP (config: Object) {
	return {type: SET_DHCP_SETTINGS, config};
}

