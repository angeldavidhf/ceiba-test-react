import React from "react";
import { Route, Redirect } from "react-router";
import { getToken } from "./commons";

function PublicRoute({ component: Component, ...rest }) {
    return (
        <Route {...rest} 
        render={ (props) => !getToken() ? <Component {...props} /> : <Redirect to={{ pathname: '/users', state: { from: props.location } }} />} 
        />
    )
}

export default PublicRoute




