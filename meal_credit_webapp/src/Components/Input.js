import React from "react";

export default function Input(props) {
    const statusStyle = {
        border: "1px red solid"
    };
    return (
        <input
            type={props.type}
            placeholder={props.placeholder}
            name={props.name}
            className="non-checkbox"
            style={statusStyle}
        />
    );
}
