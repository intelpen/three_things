import React, {Component} from "react";
import {setUser} from "../redux/actions/userActions";
import {Power} from "react-feather";
import {IconButton as MuiIconButton, Menu, MenuItem} from "@material-ui/core";
import {connect} from "react-redux";
import styled from "styled-components";
import ls from 'local-storage';
const IconButton = styled(MuiIconButton)`
  svg {
    width: 22px;
    height: 22px;
  }
`;

class UserMenu extends Component {
    state = {
        anchorMenu: null
    };

    toggleMenu = event => {
        this.setState({ anchorMenu: event.currentTarget });
    };

    closeMenu = () => {
        this.setState({ anchorMenu: null });
    };
    logout = () => {
        this.props.dispatch(setUser("guest"));
        ls.set("currentLoggedUser","guest");
    }

    render() {
        const { anchorMenu } = this.state;
        const open = Boolean(anchorMenu);

        return (
            <React.Fragment>
                <IconButton
                    aria-owns={open ? "menu-appbar" : undefined}
                    aria-haspopup="true"
                    onClick={this.toggleMenu}
                    color="inherit"
                >
                    <Power />
                </IconButton>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorMenu}
                    open={open}
                    onClose={this.closeMenu}
                >
                    <MenuItem
                        onClick={() => {
                            this.closeMenu();
                        }}
                    >
                        Profile
                    </MenuItem>
                    <MenuItem
                        onClick={() => {
                            this.closeMenu();
                            this.logout();
                        }}
                    >
                        Sign out
                    </MenuItem>
                </Menu>
            </React.Fragment>
        );
    }
}

export default connect(store => ({ user_info: store.userReducer })) (UserMenu);