import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { dashboard as dashboardRoutes, auth as authRoutes, mainPages as mainPagesRoutes } from "./index";

import DashboardLayout from "../layouts/Dashboard";
import AuthLayout from "../layouts/Auth";
import MainPageLayout from "../layouts/MainPageLayout";
import Page404 from "../pages/auth/Page404";
import {connect} from "react-redux";
import RestrictedRoute from "./RestrictedRoute"
import async from "../components/Async";
const SignIn = async(() => import("../pages/auth/SignIn"));

const childRoutes = (Layout, routes) =>
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

const Routes = () => (
  <Router>
    <Switch>
        <Route

            path="/auth/sign-in"
            exact
            render={props => (
                <AuthLayout>
                    <SignIn {...props} />
                </AuthLayout>
            )}
        />
      {childRoutes(AuthLayout, authRoutes)}
      {childRoutes(MainPageLayout, mainPagesRoutes)}
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

export default Routes;
