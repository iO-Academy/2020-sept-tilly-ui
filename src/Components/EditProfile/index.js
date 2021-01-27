import React from "react";
import {Link} from "react-router-dom";
import "./editProfile.css";
import UserForm from "../UserForm";

export default function EditProfile(props) {

    let handleSubmit = (name, username, email, password, description) => {
        const query = `mutation {
            updateUser(
                userId: "${props.currentUser.id}",
                token: "${props.currentUser.token}",
                name: "${name}",
                username: "${username}"
                email: "${email}",
                password: "${password}",
                description: "${description}"
            )
        }`;
        fetch("http://localhost:4002/graphql", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({query})
        })
            .then(() => {
                props.getUserData();
            })
    }

    return (
        <div
            id="editProfile">
            <h2
                className="editProfile-title">
                edit profile
            </h2>
            <UserForm getUserData={props.getUserData} handleSubmit={handleSubmit} currentUser={props.currentUser} name={"update"}/>
        </div>
    );
}