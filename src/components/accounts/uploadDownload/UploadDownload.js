import "./uploadDownload.css";
import React from "react";
import { useState } from "react";
import "firebase/storage";
import { ref, uploadBytes, getStorage, getDownloadURL } from "firebase/storage";
import { Box } from "@mui/material";
//import Popup from 'reactjs-popup';

const UploadDownload = () => {
  // State to store uploaded file
  const [file, setFile] = useState("");
  // Select file to upload
  function handleChange(event) {
    setFile(event.target.files[0]);
  }

  // Method to upload files
  const handleUpload = async (event) => {
    event.preventDefault();
    const storage = getStorage();
    const storageRef = ref(storage, "files/" + file.name);

    // Receives the storage reference and the file to upload.
    uploadBytes(storageRef, file);
  };

  // Method to download files
  const handleDownload = async (event) => {
    const filename = "ReviewQuiz6-AnhTruong.pdf";
    event.preventDefault();
    const storage = getStorage();
    const storageRef = ref(storage, "files/" + filename);
    // Get the download URL
    getDownloadURL(storageRef).then((url) => {
      // Insert url into an <img> tag to "download"
      // const blob = new Blob([url], {type: "application/pdf"});
      // const fileUrl = URL.createObjectURL(blob);
      // const file = document.createElement("file-to-download");
      // file.href = url;
      // file.setAttribute("download", filename);
      // document.body.appendChild(file);
      // file.click();
      // file.remove();
      window.open(url, "_blank");
    });
  };

  return (
    <form>
      <Box className="uploader-box">
        <input type="file" onChange={handleChange} />
        <button onClick={handleUpload}>Upload</button>

        <button onClick={handleDownload}>Download</button>
      </Box>
    </form>
  );
};

export default UploadDownload;
