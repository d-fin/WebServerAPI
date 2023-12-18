import React, { Component } from 'react';

export class Home extends Component {
  static displayName = Home.name;

  render() {
    return (
        <div>
            <h1>Cloud Server API</h1>
            <p>This application will run on a RPI Cluster and act as a cloud storage API.</p>
            <ol>
                <li>Upload Files for storage.</li>
                <li>View Files.</li>
                <li>Download Files to users device.</li>
            </ol>
        </div>
    );
  }
}
