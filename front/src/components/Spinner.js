import React from "react";
import "./spinner.css";

function Spinner({position}) {


    return (
        <div style={{position: position}} className="spinner-wrapper">
            <div className="spinner">
                <div className="dot1"/>
                <div className="dot2"/>
            </div>
        </div>
    );

}

export default Spinner;
