import React, {Component} from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { dashboard as dashboardRoutes, auth as authRoutes, mainPages as mainPagesRoutes } from "./index";

import DashboardLayout from "../layouts/Dashboard";
import AuthLayout from "../layouts/Auth";
import MainPageLayout from "../layouts/MainPageLayout";
import Page404 from "../pages/auth/Page404";
import {connect} from "react-redux";
import ls from 'local-storage';
import RestrictedRoute from "./RestrictedRoute"
import async from "../components/Async";
import {setUser} from "../redux/actions/userActions";
const SignIn = async(() => import("../pages/auth/SignIn"));
const CreateThreeRule = async(() => import("../pages/main_site/CreateThreeRule"));
const EditThreeRule = async(() => import("../pages/main_site/EditThreeRule"));
const MainPage = async(() => import("../pages/main_site/MainPage"));
const childRoutes = (Layout, routes) =>
    routes.map(({ children, path, component: Component }, index) =>
        children ? (
            // Route item with children
            children.map(({ path, component: Component }, index) => (
                <Route
                    key={index}
                    path={path}
                    exact
                    render={props => (
                        <Layout>
                            <Component {...props} />
                        </Layout>
                    )}
                />
            ))
        ) : (
            // Route item without children
            <Route
                key={index}
                path={path}
                exact
                render={props => (
                    <Layout>
                        <Component {...props} />
                    </Layout>
                )}
            />
        )
    );

const childRestrictedRoutes = (Layout, routes) =>
    routes.map(({ children, path, component: Component }, index) =>
        children ? (
            // Route item with children
            children.map(({ path, component: Component }, index) => (
                <RestrictedRoute
                    key={index}
                    path={path}
                    layout = {Layout}
                    exact
                    component={Component}
                />
            ))
        ) : (
            // Route item without children
            <RestrictedRoute
                path={path}
                layout = {Layout}
                exact
                component={Component}
            />
        )
    );

class Routes extends Component {
    componentWillMount() {
        var currentLoggedUser = ls.get("currentLoggedUser");
        let currDate = new Date();
        if (currentLoggedUser != null) {
            let lastLoginStr = ls.get("lastLoginDate");
            let lastLoginDate = new Date(lastLoginStr);
            let hoursSinceLastLogin = (currDate - lastLoginDate) / (1000 * 60 * 60);
            const maxLoggedInHours = 0.16
            if (hoursSinceLastLogin < maxLoggedInHours) {
                this.props.dispatch(setUser(currentLoggedUser.toString()))
            } else {
                this.props.dispatch(setUser("guest"))
            }
        }
    }
    render() {
        return (
            <Router>
                <Switch>
                    <Route
                        path="/"
                        exact
                        render={(props) => (
                            <MainPageLayout>
                                <MainPage {...props}/>
                            </MainPageLayout>
                        )}
                    />
                    <Route
                        path="/sign-in"
                        exact
                        render={(props) => (
                            <AuthLayout>
                                <SignIn {...props}/>
                            </AuthLayout>
                        )}
                    />
                    <RestrictedRoute
                        path="/create-rule"
                        layout = {MainPageLayout}
                        exact
                        component={CreateThreeRule}
                    />
                    <RestrictedRoute
                        path="/edit-rule/:id"
                        layout = {MainPageLayout}
                        exact
                        component={EditThreeRule}
                    />
                    <Route
                        render={() => (
                            <AuthLayout>
                                <Page404 />
                            </AuthLayout>
                        )}
                    />
                </Switch>
            </Router>
        );
    }
}

export default connect(store => ({ user_info: store.userReducer })) (Routes);
