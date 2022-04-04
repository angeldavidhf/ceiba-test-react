import React from "react";
import { Route, Redirect } from "react-router";
import { getToken } from "./commons";

function PrivateRoute({ component: Component, ...rest }) {
    return (
        <Route {...rest} 
        render={ (props) => getToken() ? <Component {...props} /> : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />} 
        />
    )
}

export default PrivateRoute




