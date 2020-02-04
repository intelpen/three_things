import React, {Component} from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import {connect} from "react-redux";
import {
    Avatar,
    Checkbox,
    FormControl,
    FormControlLabel,
    Input,
    InputLabel,
    Button as MuiButton,
    Paper,
    Typography
} from "@material-ui/core";
import { spacing } from "@material-ui/system";
import {pink} from "@material-ui/core/colors";
import {Star as StarIcon} from "@material-ui/icons";
import {users_list} from "../../data/users";

import {setUser} from "../../redux/actions/userActions";
const Button = styled(MuiButton)(spacing);

const Wrapper = styled(Paper)`
  padding: ${props => props.theme.spacing(6)}px;

  ${props => props.theme.breakpoints.up("md")} {
    padding: ${props => props.theme.spacing(10)}px;
  }
`;

const BigAvatar = styled(Avatar)`
  width: 92px;
  height: 92px;
  text-align: center;
  margin: 0 auto ${props => props.theme.spacing(5)}px;
`;

const PinkBigAvatar = styled(BigAvatar)`
  background-color: ${pink[500]};
`;

function checkAuth(user, password) {
    var users_list_len = users_list.length;
    for (var i =0;i< users_list_len; i++) {
        var my_user = users_list[i];
        console.log("name" +my_user.user_name.toString());
        console.log(my_user.user_password);
        if ((my_user.user_name == user) && (my_user.user_password == password)) {
            return true;
        }
    }
    return false;

}

class CreateThreeRule extends Component{
    constructor(props) {
        super(props);
        this.state = {
            title: "Three Rules for what ?",
            first_thing: "Skip the line",
            second_thing: "Jump Around",
            third_thing: "Hold your breath",
        };
        this.data ="initial_data";

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = name => event => {
        this.setState({[name]: event.target.value});
    }

    handleSubmit(event) {

        const empty_rule = {
            id : this.state.max_id,
            title : this.state.title,
            things :[this.state.first_thing, this.state.second_thing, this.state.third_thing],
            author : this.props.user_info.currentUser,
            votes_positive : 0,
            votes_negative : 0,
            hotness: 10
        };
        console.log(empty_rule);
        var jsonified_emtyp_rule = JSON.stringify(empty_rule);
        console.log(jsonified_emtyp_rule)
        fetch("http://intelpen.data-science.news:3299/list_of_things/" ,{
            "body": jsonified_emtyp_rule,
            "headers":{
                "Accept":"application/json",
                "Content-type" : "application/json"
            },
            "method":"POST"
        }).then((response) => response.json()).then((response) => console.log(response));
        this.setState({max_id : this.state.max_id+1})

    }
    componentWillMount() {
        fetch("http://intelpen.data-science.news:3299/list_of_things?_sort=id&_order=desc&_limit=1").then(response=>response.json()).then((json) =>
        {
            console.log(json);
            let max_id =  json[0].id;
            this.setState({max_id:max_id+1})
        });
    }

    render ()  {
        return (
            <Wrapper>
                <BigAvatar alt="Guest"> <StarIcon/></BigAvatar>

                <Typography component="h1" variant="h4" align="center" gutterBottom>
                    Create a new rule
                    {console.log(this)}
                </Typography>
                <Typography component="h2" variant="body1" align="center">
                    Tell us your great rules !
                </Typography>
                <form onSubmit={this.handleSubmit}>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel>What is this rule about</InputLabel>
                        <Input id="title" name="title" value    ={this.state.title} onChange={this.handleChange("title")}/>
                    </FormControl>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel>First thing </InputLabel>
                        <Input id="first_thing" name="first_thing" value={this.state.first_thing} onChange={this.handleChange("first_thing")}/>
                    </FormControl>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel>Second thing </InputLabel>
                        <Input id="second_thing" name="second_thing" value={this.state.second_thing} onChange={this.handleChange("second_thing")}/>
                    </FormControl>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel>Third thing </InputLabel>
                        <Input id="third_thing" name="third_thing" value={this.state.third_thing} onChange={this.handleChange("third_thing")}/>
                    </FormControl>
                    <Button
                        fullWidth
                        component={Link}
                        to = "/"
                        variant="contained"
                        color="primary"
                        mb={2}
                        onClick = {this.handleSubmit}
                    >
                        Publish your rule, {this.props.user_info.currentUser!=null?this.props.user_info.currentUser:"guest"} !
                    </Button>
                </form>
            </Wrapper>
        );
    }
}

export default connect(store => ({ user_info: store.userReducer })) (CreateThreeRule);
