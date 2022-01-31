import React from "react";
import "./CustomInput.css"

const CustomInput = (props: any) => {
    const classes = 'customInput ' + props.className;
    return <input className={classes}>{props.children}</input>
}

export default CustomInput;