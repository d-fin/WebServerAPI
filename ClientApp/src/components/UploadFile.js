import React, { useState } from 'react';
import './UploadFile.css';

const UploadFile = () => {
    const [data, setData] = useState([]);
    const [selectedFile, setSelectedFile] = useState();

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    }

    const handleUpload = () => {
        const formData = new FormData();
        formData.append('file', selectedFile);

        console.log(formData);

        fetch('https://localhost:7165/api/UploadFile', {
            method: 'POST',
            body: formData,
        })
            .then(response => response.json())
            .then(data => {
                console.log("file uploaded successfully.");
            })
            .catch(error => {
                console.error('Error:', error);
            });
        //fetchData();
    };

    return (
        <div>
            <div className="container-upload">         
                <input type="file" onChange={handleFileChange} />
                <button onClick={handleUpload}>Upload</button>
            </div>
        </div>
        
    );
};

export default UploadFile;