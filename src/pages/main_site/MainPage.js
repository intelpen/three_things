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
        this.state ={
            top_three : null,
            hot_rules : null,
            current_user_rules :null,
        }
    }

    onContainerReady = container => {
        this.containers.push(container);
    };

    componentDidMount() {
        dragula(this.containers);
        fetch("http://localhost:8199/list_of_things/?author=mishu").then(response=>response.json()).then((json) =>
        {
            console.log(json);
            this.setState({current_user_rules:json})
        });
        fetch("http://localhost:8199/list_of_things/?_sort=votes_positivie&_limit=3").then(response=>response.json()).then((json) =>
        {
            console.log(json);
            this.setState({top_three:json})
        });
        fetch("http://localhost:8199/list_of_things/?_sort=hotness&_order=asc&_limit=3").then(response=>response.json()).then((json) =>
        {
            console.log(json);
            this.setState({hot_rules:json})
        });

    }

    render() {
        const empty_rule = {
            "id": 2,
            "title" : "Three rules for Great Shape",
            "things" :["Wake Up Early", "Do 100 push-ups", "Do not eat all the fridge"],
            "author_id" : 2,
            "votes_positive" : 1,
            "votes_negative" : 0,
            "hotness": 2
        }
        return (
        <React.Fragment>
            {console.log(this.state)}
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
                        <ThreeRule rule={this.state.top_three==null?empty_rule:this.state.top_three[0] }/>
                        <ThreeRule rule={this.state.top_three==null?empty_rule:this.state.top_three[1] }/>
                        <ThreeRule rule={this.state.top_three==null?empty_rule:this.state.top_three[2] }/>
                    </Lane>
                </Grid>

                <Grid item xs={8} lg={8} xl={8} >
                    <Lane
                        title="Hot rules"
                        description="New and popular rules"adrianuser
                        onContainerLoaded={this.onContainerReady}
                    >
                        <ThreeRule rule={this.state.hot_rules==null?empty_rule:this.state.top_three[0] }/>
                        <ThreeRule rule={this.state.hot_rules==null?empty_rule:this.state.top_three[1] }/>
                        <ThreeRule rule={this.state.hot_rules==null?empty_rule:this.state.top_three[2] }/>
                    </Lane>
                </Grid>
            </Grid>
        </React.Fragment>
    )
    };
}

export default connect(store => ({ user_info: store.userReducer }))(MainPage);
