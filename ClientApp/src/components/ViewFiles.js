import React, { Component, useEffect, useState } from 'react';
import UploadFile from './UploadFile';
import DownloadFile from './DownloadFile'
import './ViewFiles.css';


const ViewFile = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('https://localhost:7165/api/UploadFile');

            if (!response.ok) {
                throw new Error("Failed to retrieve data.");
            }

            const jsonData = await response.json();
            console.log(jsonData);
            setData(jsonData);
        }
        catch (error) {
            console.log("Error fetching data: ", error);
        }
    };

    const truncateString = (str, maxLength) => {
        if (str.length <= maxLength) {
            return str;
        } else {
            return str.substring(0, maxLength); 
        }
    };

    const handleDownload = (id) => {
        console.log(id);
        fetch('https://localhost:7165/api/DownloadFile/$', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: id }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                console.error('Error: ', error);
            });
        
        
    };

    return (
        <main>
            <div class="container-header">
                <h1 class="header">Files</h1>
            </div>

            <div class="container-uploadButton">
                <UploadFile /> 
            </div>

            <div class="container-table">
                <table>
                    <thead>
                        <tr>
                            <th>File Name</th>
                            <th>File Path</th>
                            <th>Upload Date</th>
                            <th>Download</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item) => (
                            <tr key={item.id}>
                                <td>{item.fileName}</td>
                                <td>{item.filePath}</td>
                                <td>{truncateString(item.uploadDate, 10)}</td>
                                <td>
                                    <button class="download-btn" onClick={handleDownload(item.id)}>Download</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </main>
        
        
    );
}

export default ViewFile;