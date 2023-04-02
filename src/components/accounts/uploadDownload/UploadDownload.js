
import React from 'react';
import {useState} from "react";
import 'firebase/storage';
import { getStorage } from "firebase/storage";

import {
    ref,
    uploadBytes,
} from "firebase/storage";

const UploadDownload = () => {
    // State to store uploaded file
    const [file, setFile] = useState("");

     // Handle file upload event and update state
    function handleChange(event) {
        setFile(event.target.files[0]);
        console.log(file);
    }
    
    const handleUpload = async(event) => {
        event.preventDefault();
        console.log(file);
        const storage = getStorage();
        const storageRef = ref(storage, `${file.name}`);
            
        // Receives the storage reference and the file to upload.
        uploadBytes(storageRef, file).then((snapshot) => {
            console.log('Uploaded a file!');
        });
    };

    return(
        <form>
            <input type="file" onChange={handleChange} />
            <button onClick={handleUpload}>Upload to Firebase</button>
        </form>
    );
};

export default UploadDownload;