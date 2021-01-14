import React from 'react';
import './lightswitch.css';

export default function LightSwitch(props) {
    return (
        <div id="lightSwitch">
            <input
                id="switch"
                type="checkbox"
                checked={props.checked}
                onChange={props.onHandleChange}
            />
            <label htmlFor="switch">
                <span>
                </span>
            </label>
        </div>
    );
}
