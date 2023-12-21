import React, { Component } from 'react';
import '../css/Login.css';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            isLoginSuccessful: false,
            registrationMode: false,
            firstName: '',
            lastName: '',
            email: '',
            confirmPassword: '',
        };
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    handleLoginSubmit = (event) => {
        event.preventDefault();

        const { username, password } = this.state;

        // validate login
        var formData = new FormData();
        formData.append("username", username);
        formData.append("password", password);

        fetch('https://localhost:7165/api/LoginUser', {
            method: 'POST',
            body: formData,
        })
            .then((response) => {
                if (response.ok) {
                    // login was successful
                    console.log("login successful.");

                    localStorage.setItem('user', username);
                    this.isLoginSuccessful = true;
                    window.location.href = '/';
                } else {
                    // login failed
                    console.log("login failed.");
                    console.log(response.statusText);
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    handleRegistrationSubmit = (event) => {
        event.preventDefault();

        const { firstName, lastName, email, password, confirmPassword } = this.state; 

        var formData = new FormData();
        formData.append('firstName', firstName);
        formData.append('lastName', lastName);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('confirmPassword', confirmPassword);

        fetch('https://localhost:7165/api/RegisterUser', {
            method: 'POST',
            body: formData,
        })
            .then((response) => {
                if (response.ok) {
                    // Registration was successful
                    console.log("Registration successful.");
                    this.toggleRegistrationMode();
                } else {
                    // Registration failed
                    console.log("Registration failed.");
                    console.log(response.statusText);
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    toggleRegistrationMode = () => {
        this.setState((prevState) => ({
            registrationMode: !prevState.registrationMode,
        }));
    };

    render() {
        const {
            username,
            password,
            isLoginSuccessful,
            registrationMode,
            firstName, 
            lastName, 
            email, 
            confirmPassword,
        } = this.state;

        if (isLoginSuccessful) {
            return (
                <div>
                    <p>Welcome, {username}!</p>
                </div>
            );
        }

        return (
            <div className="login-div">
                <h2 className="login-h2">{registrationMode ? 'Register' : 'Login'}</h2>
                <form className="login-form" onSubmit={registrationMode ? this.handleRegistrationSubmit : this.handleLoginSubmit}>
                    {registrationMode && (
                        <div>
                            <input
                                type="text"
                                name="firstName"
                                placeholder="First Name"
                                value={firstName}
                                onChange={this.handleInputChange}
                            />
                        </div>
                    )}
                    {registrationMode && (
                        <div>
                            <input
                                type="text"
                                name="lastName"
                                placeholder="Last Name"
                                value={lastName}
                                onChange={this.handleInputChange}
                            />
                        </div>
                    )}
                    <div>

                        <input
                            type="text"
                            name={registrationMode ? 'email' : 'username'}
                            placeholder={registrationMode ? 'Email' : 'Username'}
                            value={registrationMode ? email : username}
                            onChange={this.handleInputChange}
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={password}
                            onChange={this.handleInputChange}
                        />
                    </div>
                    <div>
                        {registrationMode && (
                            <div>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Confirm Password"
                                    value={confirmPassword}
                                    onChange={this.handleInputChange}
                                />
                            </div>
                        )}
                    </div>
                    <div>
                        <button type="submit">
                            {registrationMode ? 'Register' : 'Login'}
                        </button>
                    </div>
                </form>
                <div>
                    <button className="toggle-button" onClick={this.toggleRegistrationMode}>
                        {registrationMode ? 'Switch to Login' : 'Switch to Register'}
                    </button>
                </div>
            </div>
        );
    }
}

export default Login;
