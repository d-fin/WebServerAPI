import React, { Component } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { LoginMenu } from './api-authorization/LoginMenu';
import './css/NavMenu.css';

export class NavMenu extends Component {
    static displayName = NavMenu.name;

    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true,
            isLoggedIn: false
        };
    }
    componentDidMount() {
        this.checkAuth();
    }

    checkAuth() {
        const isAuth = localStorage.getItem('user') !== null;
        this.setState({ isLoggedIn: isAuth });
    }

    handleLogout() {
        localStorage.removeItem('user');
        this.setState({ isLoggedIn: false });
        window.location.href = '/login-page';
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    render() {
        const { isLoggedIn } = this.state;

        return (
            <header>
                <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" container light>
                    <NavbarBrand tag={Link} to="/">DF Tech Solutions</NavbarBrand>
                    <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                    <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
                        <ul className="navbar-nav flex-grow">
                            <NavItem>
                                <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
                            </NavItem>

                            {isLoggedIn && (
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/view-file">Files</NavLink>
                                </NavItem>
                            )}


                            {isLoggedIn ? (
                                <>
                                    <NavItem>
                                        <NavLink tag={Link} className="text-dark" to="/">
                                            Profile
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink tag={Link} className="text-dark" onClick={this.handleLogout.bind(this)}>
                                            Logout
                                        </NavLink>
                                    </NavItem>
                                </>
                            ) : (
                                <NavLink tag={Link} className="text-dark" to="/login-page">
                                    Login
                                </NavLink>
                            )}
                        </ul>
                    </Collapse>
                </Navbar>
            </header>
        );
    }
}
