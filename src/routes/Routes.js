import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { dashboard as dashboardRoutes, auth as authRoutes, mainPages as mainPagesRoutes } from "./index";

import DashboardLayout from "../layouts/Dashboard";
import AuthLayout from "../layouts/Auth";
import MainPageLayout from "../layouts/MainPageLayout";
import Page404 from "../pages/auth/Page404";

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

const Routes = () => (
  <Router>
    <Switch>
      {childRoutes(DashboardLayout, dashboardRoutes)}
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
