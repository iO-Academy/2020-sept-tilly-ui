import React from 'react';
import './buttons.css';

export default function Button(props) {
    return <button onClick={props.onHandleClick} disabled={props.disabled}>{props.name}</button>
}