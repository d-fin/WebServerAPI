import React, { Component } from 'react';
import './css/Home.css'

export class Home extends Component {
    static displayName = Home.name;
  
    render() {
        const isLoggedIn = localStorage.getItem('user') !== null;

        if (!isLoggedIn) {
            window.location.href = '/login-page';
        }

        return (
            <div className="container-description">
                <h1 className="header">Cloud Server API</h1>
                <p className="subheader">Your cloud storage solution</p>
                <div className="goal-list">
                    <h4>Goals of this application:</h4>
                    <ul>
                        <li>Upload files for secure storage.</li>
                        <li>Effortlessly view files stored on the server.</li>
                        <li>Download files from the server to any device.</li>
                    </ul>
                </div>
            </div>
        );
    }
}