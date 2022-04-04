import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import axios from "axios";

import Header from "./Header";

import HomeView from "./views/HomeView";
import LoginView from "./views/LoginView";
import UsersView from "./views/UsersView";
import CreateUserView from "./views/CreateUserView";

import PrivateRoute from "./utils/PrivateRoute";
import PublicRoute from "./utils/PublicRoute";
import { getToken, removeTokenSession, setTokenSession } from './utils/commons';


function App() {
    const [ authLoading, setAutoLoading ] = useState(true);

    useEffect(() => {
        const token = getToken();

        if (!token) {
            return;
        }
    }, []);

	return (
		<div className="main">
			<BrowserRouter>
                <Header />
                <div className="container-fluid">
                    <Switch>
                        <Route exact path="/" component={HomeView}/>                            
                        <PublicRoute path="/login" component={LoginView}/>
                        <PrivateRoute path="/users" component={UsersView}/>
                        <PrivateRoute path="/create" component={CreateUserView}/>                            
                    </Switch>
                </div>
            </BrowserRouter>
		</div>

	);
}

export default App;
