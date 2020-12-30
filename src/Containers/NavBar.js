import React, {Component} from 'react';
import {NavLink, Route} from  'react-router-dom';
import {Menu} from 'semantic-ui-react'

class NavBar extends React.Component {
    render(){
        return(
            <div>
                <menu className="navBar">
                    <Menu.Item as={NavLink} to="/signup">
                        Sign-Up
                    </Menu.Item>
                    <Menu.Item as={NavLink} to="/login">
                        Login
                    </Menu.Item>
                    <Menu.Item as={NavLink} to="/routines">
                        Home
                    </Menu.Item>
                    <Menu.Item as={NavLink} to="/users/:id">
                        User Page
                    </Menu.Item>
                    <Menu.Item as={NavLink} to="/logout">
                        Logout
                    </Menu.Item>
                </menu>
            </div>
        )
    }
}
export default NavBar;