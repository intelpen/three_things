import {Redirect, Route} from "react-router-dom";
import {connect} from "react-redux";
import React from "react";

function RestrictedRoute(props) {
    if (props.user_info.currentUser.toString() != "guest") {
        console.log("index" + props.key);
        console.log("Component" + props.component);
        console.log("path" + props.path);
        console.log("Layout" + props.layout);
        console.log("user" + props.user_info.currentUser);
        return (
            <Route
                key={props.key}
                path={props.path}
                exact
                render={prop => (
                    <props.layout>
                        <props.component {...prop} />
                    </props.layout>
                )}
            />
        )
    } else {
        return (
            <Redirect
                to = "/auth/sign-in"
            />
        )
    }

}

export default connect(store => ({ user_info: store.userReducer }))(RestrictedRoute) ;