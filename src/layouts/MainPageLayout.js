import React from "react";
import styled, { createGlobalStyle } from "styled-components";

import {CssBaseline,
    Paper as MuiPaper,
    withWidth
} from "@material-ui/core";
import Header from "../components/Header";
import {isWidthUp} from "@material-ui/core/withWidth";
import Footer from "../components/Footer";
import {spacing} from "@material-ui/system";

const GlobalStyle = createGlobalStyle`
  html,
  body,
  #root {
    height: 100%;
  }

  body {
    background: ${props => props.theme.body.background};
  }
`;

const Root = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  min-height: 100vh;
`;
const AppContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Paper = styled(MuiPaper)(spacing);

const MainContent = styled(Paper)`
  flex: 1;
  background: ${props => props.theme.body.background};

  @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
    flex: none;
  }

  .MuiPaper-root .MuiPaper-root {
    box-shadow: none;
  }
`;

class Page extends React.Component {
    state = {
        mobileOpen: false
    };

    handleDrawerToggle = () => {
        this.setState(state => ({ mobileOpen: !state.mobileOpen }));
    };

    render() {
        const {children, width} = this.props;
        return (
            <Root>
                <CssBaseline/>
                <GlobalStyle/>
                <AppContent>
                    <Header onDrawerToggle={this.handleDrawerToggle}/>
                    <MainContent p={isWidthUp("lg", width) ? 10 : 8}>
                        {children}
                    </MainContent>
                    <Footer/>
                </AppContent>
            </Root>
        );
    }
}

export default withWidth()(Page);
