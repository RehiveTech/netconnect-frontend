import Axios from "axios";
import InstantAction from "../Utils/InstantAction";
import localStorageProxy from "../Utils/localStorage";
import localStorage from "../Utils/localStorage";

/**
 *
 * @param configuration
 * @constructor
 */
export default function BackendRequest(configuration: Object) {

    // Initiate Backend request
    new BackendRequestProto({
        ...configuration,
        customHeaders: {
            "Authorization": "JWT " + localStorage.getItem("JWT"),
            ...configuration.customHeaders
        }
    });


}

class BackendRequestProto {

    /**
     * Method
     * Available methods: GET, POST, DELETE, PUT
     * @type {string}
     */
    static method = "get";
    /**
     * Payload
     * @type {null|Object}
     */
    static payload = {};
    /**
     * REST API endpoint
     * @type {string}
     */
    static endpoint = "";

    /**
     * Self | this
     * @type {null|Object}
     */
    static self = null;
    /**
     * Custom headers
     * @type {{}}
     */
    static customHeaders = {};
    /**
     * Custom server if not default
     * default from .env
     * @type {null}
     */
    static customServer = null;
    /**
     * Default Headers
     * @type {{"Access-Control-Allow-Origin": string, "X-Requested-With": string, Authorization: string}}
     */
    static defaultHeaders = {
        "Access-Control-Allow-Origin": "*",
        "X-Requested-With": "XMLHttpRequest",
    };

    /**
     * Constructor
     * @param configuration
     */
    constructor(configuration: Object) {

        this.method = BackendRequestProto.method;
        this.payload = BackendRequestProto.payload;
        this.endpoint = BackendRequestProto.endpoint;
        this.customServer = BackendRequestProto.customServer;
        this.afterSuccess = BackendRequestProto.afterSuccess;
        this.afterError = BackendRequestProto.afterError;
        this.customHeaders = BackendRequestProto.customHeaders;
        this.self = BackendRequestProto.self;

        Object.keys(configuration).forEach((keyProperty) => {
            this[keyProperty] = configuration[keyProperty];
        });

        this.execute();
    }

    /**
     * After Success
     * @param response
     */
    static afterSuccess = (response) => {
    };

    /**
     * After error data
     * @param response
     */
    static afterError = (response) => {

    };

    /**
     * On Success
     * @param response
     */
    onSuccess = (response) => {

        if (process.env.NODE_ENV === "development") {
            console.log(response);
        }

        /**
         * Response parent
         */
        if (this.self !== null) {
            this.self.setState({
                expectingResponse: false,
            });
        }

        // Do custom after success stuff
        this.afterSuccess(response);
    };

    /**
     * On Error default behaviour
     * @param error
     */
    onError = (error) => {

        if (process.env.NODE_ENV === "development") {
            console.log(error.response);
        }

        /**
         * Response parent
         */
        if (this.self !== null) {
            this.self.setState({
                expectingResponse: false,
            });
        }

        /**
         * Default Behaviour
         */
        if (error.response !== undefined) {
            if (error.response.status === 401) {
                // Remove Authorization From
                localStorageProxy.removeItem("JWT");

                // Redirect URL
                InstantAction.redirect(process.env.LOGIN_URL);

                // Reset Store
                InstantAction.resetStore();
            }
        }

        this.afterError(error.response);
    };

    /**
     *
     */
    prepareData = () => {

        return this.payload;
    };

    /**
     * Execute
     */
    execute = () => {

        let self = this;


        /**
         * Response parent
         */
        if (this.self !== null) {
            this.self.setState({
                expectingResponse: true,
            });
        }

        Axios({
            method: this.method,
            url: ((this.customServer === null) ? process.env.REACT_APP_BACKEND_SERVER : this.customServer) + this.endpoint,
            data: this.prepareData(),
            headers: {
                ...BackendRequestProto.defaultHeaders,
                ...this.customHeaders
            },
            // xsrfCookieName: 'csrftoken',
            // xsrfHeaderName: 'X-CSRFToken',
        }).then(function (response) {
                // Do on success
                self.onSuccess(response);
            }
        ).catch(function (error) {
            self.onError(error);
        });
    };


}
