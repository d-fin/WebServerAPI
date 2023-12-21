import React, { Component, useEffect, useState } from 'react';
import './css/ViewFiles.css';


const ViewFile = () => {
    const [data, setData] = useState([]);
    
    const [selectedFile, setSelectedFile] = useState();

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    }

    const handleUpload = () => {
        const formData = new FormData();
        const username = localStorage.getItem('user')
        formData.append('file', selectedFile);
        formData.append('username', username);

        fetch('https://localhost:7165/api/UploadFile', {
            method: 'POST',
            body: formData,
        })
            .then((response) => {
                if (response.ok) {
                    console.log("Successfully uploaded file.")
                    fetchData();
                }
            })
          
            .catch(error => {
                console.error('Error:', error);
            });
        fetchData();
    };

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const username = localStorage.getItem("user");
            const response = await fetch(`https://localhost:7165/api/UploadFile?username=${username}`);

            if (!response.ok) {
                throw new Error("Failed to retrieve data.");
            }

            const jsonData = await response.json();
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

    const handleDownload = (id, name) => {
        console.log("file download id = ", id);

        const formData = new FormData();
        formData.append('id', id);

        fetch('https://localhost:7165/api/DownloadFile', {
            method: 'POST',
            body: formData, 
        })
            .then((response) => {
                if (response.ok) {
                    const filename = name; 
                    return response.blob()
                        .then((blob) => {
                            const url = window.URL.createObjectURL(blob);
                            const a = document.createElement('a');
                            a.href = url;
                            a.download = filename;
                            document.body.appendChild(a);
                            a.click();
                            window.URL.revokeObjectURL(url);
                        });
                }
                else {
                    console.error('Error: ', response.statusText);
                }
            })
            .catch((error) => {
                console.error('Error: ', error);
            });
    };

    const handleDelete = (id, name) => {
        const confirmed = window.confirm("Are you sure you want to delete the file \"", name, "\"?");

        if (confirmed) {
            console.log("file delete id = ", id);

            const formData = new FormData();
            formData.append('id', id);

            fetch('https://localhost:7165/api/DownloadFile', {
                method: 'DELETE',
                body: formData,
            })
                .then((response) => {
                    if (response.ok) {
                        console.log("Successfully deleted the file.");
                        fetchData();
                    }
                })
                .catch(error => {
                    console.log("Error: ", error);
                });
        }
    };

    return (
        <main>
            <div className="container-header">
                <h1 className="header">Files</h1>
            </div>

            <div className="container-uploadButton">
                <div>
                    <div className="container-upload">
                        <label className="upload-button">
                            Upload File
                            <input
                                type="file"
                                onChange={handleFileChange}
                                style={{ display: "none" }} 
                            />
                        </label>
                        <div className="gap"></div>
                        <button className="upload-file-btn" onClick={handleUpload}>Upload</button>
                    </div>
                </div>
            </div>

            <div className="container-table">
                <table>
                    <thead>
                        <tr>
                            <th>File Name</th>
                            <th>File Path</th>
                            <th>Upload Date</th>
                            <th>Download</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item) => (
                            <tr key={item.id}>
                                <td>{item.fileName}</td>
                                <td>{item.filePath}</td>
                                <td>{truncateString(item.uploadDate, 10)}</td>
                                <td>
                                    <button className="download-btn" onClick={() => handleDownload(item.id, item.fileName)}>Download</button>
                                </td>
                                <td>
                                    <button className="delete-btn" onClick={() => handleDelete(item.id, item.fileName)}>Delete</button>
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