// @flow

// Necessary Evil
import React from "react";

const FormGroup = (props) => {

    // if(props.style === undefined){
    //     props.style = {};
    // }

    return <div className="form__group" style={{...props.style}}>
        {props.children}
    </div>;
};

export default FormGroup;