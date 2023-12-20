import React, { Component } from 'react';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            isLoginSuccessful: false,
            registrationMode: false,
            registrationUsername: '',
            registrationPassword: '',
        };
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    handleLoginSubmit = (event) => {
        event.preventDefault();

        // Perform login logic here
        const { username, password } = this.state;

        // validate login
    };

    handleRegistrationSubmit = (event) => {
        event.preventDefault();

        const { registrationUsername, registrationPassword } = this.state;

        // handle registration
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
            registrationUsername,
            registrationPassword,
        } = this.state;

        if (isLoginSuccessful) {
            return (
                <div>
                    <p>Welcome, {username}!</p>
                </div>
            );
        }

        return (
            <div>
                <h2>{registrationMode ? 'Register' : 'Login'}</h2>
                <form onSubmit={registrationMode ? this.handleRegistrationSubmit : this.handleLoginSubmit}>
                    <div>
                        <label>Username:</label>
                        <input
                            type="text"
                            name={registrationMode ? 'registrationUsername' : 'username'}
                            value={registrationMode ? registrationUsername : username}
                            onChange={this.handleInputChange}
                        />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input
                            type="password"
                            name={registrationMode ? 'registrationPassword' : 'password'}
                            value={registrationMode ? registrationPassword : password}
                            onChange={this.handleInputChange}
                        />
                    </div>
                    <div>
                        <button type="submit">
                            {registrationMode ? 'Register' : 'Login'}
                        </button>
                    </div>
                </form>
                <div>
                    <button onClick={this.toggleRegistrationMode}>
                        {registrationMode ? 'Switch to Login' : 'Switch to Register'}
                    </button>
                </div>
            </div>
        );
    }
}

export default Login;
