import {withRouter} from "react-router";
import { toast } from "react-toastify";

/**
 * Instant Action
 */
class InstantAction {


    /**
     * Init
     * @param history
     */
    static initiateHistory(history) {

        InstantAction.history = history;

    }

    /**
     * Redirect
     * @param path
     */
    static redirect(path) {

        InstantAction.history.push(path);

    }

    /**
     * Set Dialog toast
     * @param message
     */
    static setToast(message) {

        toast(message);

    }

}


export default InstantAction = withRouter(InstantAction);