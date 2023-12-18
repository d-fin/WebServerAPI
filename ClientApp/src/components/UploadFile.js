import React from 'react';

const UploadFile = () => {

    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = () => {
        const formData = new FormData();
        formData.append('file', selectedFile);

        fetch('/api/upload', {
            method: 'POST',
            body: formData,
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    return (
        <main>
            <div>
                <h1>Upload Files</h1>
            </div>
            <div>
                <input type="file" onChange={handleFileChange} />
                <button onClick={handleUpload}>Upload</button>
            </div>
        </main>
    );
};

export default UploadFile;