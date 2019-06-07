import React from "react";
import {ClipLoader} from "react-spinners";

/**
 * Loading component for Async Loading
 * @return {*}
 * @constructor
 */
const LoadingComponent = () => (
    <div style={{justifyContent: "center", alignItems: "center", display: "flex", flex: "1 1"}}>
        <ClipLoader
            color={"#00ceb4"}
            size={3}
            sizeUnit={"rem"}
        />
    </div>
);

export default LoadingComponent;