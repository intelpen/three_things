import React from "react";
import styled from "styled-components";
import { NavLink as RouterNavLink } from "react-router-dom";
import "react-dragula/dist/dragula.css";

import {
    Avatar as MuiAvatar,
    Breadcrumbs as MuiBreadcrumbs,
    Button,
    Card as MuiCard,
    CardContent,
    Divider as MuiDivider,
    Grid,
    Link,
    Typography as MuiTypography
} from "@material-ui/core";

import { spacing } from "@material-ui/system";

import dragula from "react-dragula";
import ThreeRule from "./ThreeRule.js"
import users from "../../data/users.json";
import list_of_three_things from "../../data/list_of_three_things.json";
import { connect } from "react-redux";
import { setUser } from "../../redux/actions/userActions";
const NavLink = React.forwardRef((props, ref) => (
    <RouterNavLink innerRef={ref} {...props} />
));

const Card = styled(MuiCard)(spacing);

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const TaskWrapper = styled(Card)`
  border: 1px solid ${props => props.theme.palette.grey[300]};
  background: ${props => props.theme.body.background};
  margin-bottom: ${props => props.theme.spacing(4)}px;
  cursor: grab;
`;

const TaskWrapperContent = styled(CardContent)`
  &:last-child {
    padding-bottom: ${props => props.theme.spacing(4)}px;
  }
`;

const Typography = styled(MuiTypography)(spacing);

const Avatar = styled(MuiAvatar)`
  float: right;
  margin-left: ${props => props.theme.spacing(1)}px;
  height: 32px;
  width: 32px;
`;

class Lane extends React.Component {
    handleContainerLoaded = container => {
        if (container) {
            this.props.onContainerLoaded(container);
        }
    };

    render() {
        const { title, description, children } = this.props;

        return (
            <Card mb={6}>
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        {title}
                    </Typography>
                    <Typography variant="body2" mb={4}>
                        {description}
                    </Typography>
                    <div ref={this.handleContainerLoaded}>{children}</div>
                </CardContent>
            </Card>
        );
    }
}

function Task({ description, avatar }) {
    return (
        <TaskWrapper mb={4}>
            <TaskWrapperContent>
                <Avatar alt="Avatar" src={`/static/img/avatars/avatar-${avatar}.jpg`} />
                <Typography variant="body2" mb={3}>
                    {description}
                </Typography>

                <Button size="small" variant="contained" color="secondary">
                    View
                </Button>
            </TaskWrapperContent>
        </TaskWrapper>
    );
}


class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.containers = [];
    }

    onContainerReady = container => {
        this.containers.push(container);
    };

    componentDidMount() {
        dragula(this.containers);
    }

    render = () => (

        <React.Fragment>

            <Typography variant="h3" gutterBottom display="inline"  align-items={"center"} justify={"center"}>
                Welcome to three things, {this.props.user_info.currentUser.toString()} !
            </Typography>
            <Divider my={6} />

            <Grid container spacing={12} align-items={"center"} justify={"center"}>
                <Grid item xs={8} lg={8} xl={8} >
                    <Lane
                        title="Top 3 Rules Overall"
                        onContainerLoaded={this.onContainerReady}
                    >
                        <ThreeRule rule={list_of_three_things[0] }/>
                        <ThreeRule rule={list_of_three_things[1]}  />
                        <ThreeRule rule={list_of_three_things[0] } />
                    </Lane>
                </Grid>

                <Grid item xs={8} lg={8} xl={8} >
                    <Lane
                        title="Hot rules"
                        description="New and popular rules"
                        onContainerLoaded={this.onContainerReady}
                    >
                        <ThreeRule rule={list_of_three_things[1] }/>
                        <ThreeRule rule={list_of_three_things[2]}  />
                        <ThreeRule rule={list_of_three_things[3] } />
                    </Lane>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default connect(store => ({ user_info: store.userReducer }))(MainPage);
