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
import ls from 'local-storage';
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
    if ((my_user.user_name == user) && (my_user.user_password == password))  {
      return true;
    }
  }
  return false;

}

class SignIn extends Component{
  constructor(props) {
    super(props);
    this.state = {
      user: "user",
      password: "******",
      remember_me: true,

  };
    this.data ="initial_data";

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = name => event => {
    this.setState({[name]: event.target.value});
  }

  handleSubmit(event) {
    let good_auth = checkAuth(this.state.user, this.state.password);
    if (!good_auth) {
      event.preventDefault();
      alert("please use as password username_parola")
    }
    else {
      this.props.dispatch(setUser(this.state.user));
      ls.set("currentLoggedUser",this.state.user.toString());
      let currDate = new Date()
      ls.set("lastLoginDate",currDate);
    }
  }
  componentWillMount() {
    fetch("http://localhost:3299/list_of_things/?author=mishu").then(response=>response.json()).then((json) =>
    {
      console.log(json);
    this.setState({data:json})
    });
  }

  render ()  {
    return (
        <Wrapper>
          <BigAvatar alt="Guest"> <StarIcon/></BigAvatar>

          <Typography component="h1" variant="h4" align="center" gutterBottom>
            Welcome user, please log in or <Link to="sign-up"> sign up</Link> !
            {console.log(this)}
          </Typography>
          <Typography component="h2" variant="body1" align="center">
            Email adress or username
          </Typography>
          <form onSubmit={this.handleSubmit}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Username or Email Address</InputLabel>
              <Input id="user" name="user" value={this.state.user} onChange={this.handleChange("user")}/>
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                  name="password"
                  type="password"
                  id="password"
                  value={this.state.password}
                  onChange={this.handleChange("password")}
              />
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
              Sign in {this.state.user.toString()}
            </Button>
          </form>
        </Wrapper>
    );
  }
}

export default connect() (SignIn);
