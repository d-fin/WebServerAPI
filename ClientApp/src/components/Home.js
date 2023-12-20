import React, { Component } from 'react';
import './css/Home.css'

export class Home extends Component {
  static displayName = Home.name;

  render() {
    return (
        <div className="container-description">
            <h1>Cloud Server API</h1>
            <h4>This application will run on a RPI Cluster and act as a cloud storage API.</h4>
            <p>The goal of this application are the following:</p>
            <p>Upload files for storage on my server.</p>
            <p>View files stored on the server.</p>
            <p>Download files from my server to any device.</p>
           {/* <ul>
                <li>Upload Files for storage.</li>
                <li>View Files.</li>
                <li>Download Files to users device.</li>
            </ul>*/}
        </div>
    );
  }
}
