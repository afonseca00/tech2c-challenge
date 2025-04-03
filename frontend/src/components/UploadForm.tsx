import React, { useState } from 'react';
import axios from 'axios';

interface UploadFormProps {
  onUploadSuccess: () => void;
}

const UploadForm: React.FC<UploadFormProps> = ({ onUploadSuccess }) => {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      setMessage(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      setMessage('Please select a file before uploading.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:3000/data/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setMessage(`Upload successful: ${response.data.inserted} records added.`);
      onUploadSuccess(); // trigger refresh
    } catch (error) {
      console.error(error);
      setMessage('Upload failed. Please try again.');
    }
  };

  return (
    <div className="container mt-4">
      <h4 style={{ color: '#239F94', fontWeight: 'bold' }}>Upload Excel File</h4>
      <form onSubmit={handleSubmit} className="shadow p-4 rounded" style={{ backgroundColor: 'white' }}>
        <div className="mb-3">
          <input
            type="file"
            accept=".xlsx"
            onChange={handleFileChange}
            className="form-control"
            style={{ borderColor: '#239F94' }}
          />
        </div>
        <button 
          type="submit" 
          className="btn btn-primary w-100" 
          style={{ backgroundColor: '#239F94', borderColor: '#239F94' }}
        >
          Upload
        </button>
      </form>
      {message && <div className="mt-3 alert alert-info">{message}</div>}
    </div>
  );
};

export default UploadForm;