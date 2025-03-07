import React, { useState, useEffect } from 'react';
import styles from './FileAttachment.module.css';

const FileAttachment = ({ files, setFiles }) => {
  const [fileInput, setFileInput] = useState(null);
  const [error, setError] = useState('');

  // Cleanup object URLs when the component unmounts or when files are removed
  useEffect(() => {
    return () => {
      files.forEach((fileData) => {
        if (fileData.preview) {
          URL.revokeObjectURL(fileData.preview);
        }
      });
    };
  }, [files]);

  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files).slice(0, 3);
    const maxSize = 3 * 1024 * 1024; // 1MB in bytes
    let validFiles = [];
    let errorMessage = '';

    selectedFiles.forEach((file) => {
      if (file.size > maxSize) {
        errorMessage = `${file.name} exceeds the 3MB size limit.`;
      } else {
        validFiles.push({
          file,
          preview: URL.createObjectURL(file),
        });
      }
    });

    if (errorMessage) {
      setError(errorMessage);
    } else {
      setError('');
    }

    // Add valid files to the files prop
    setFiles((prevFiles) => [
      ...prevFiles,
      ...validFiles,
    ]);
  };

  // Handle file removal
  const handleRemoveFile = (index) => {
    const fileToRemove = files[index];
    if (fileToRemove.preview) {
      URL.revokeObjectURL(fileToRemove.preview); // Cleanup the object URL
    }

    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  return (
    <div className={styles.container}>
      {/* File Input */}
      <input
        
        type="file"
        accept="image/*,application/pdf" // Accept images and PDFs
        multiple
        onChange={handleFileChange}
        className={styles.fileInput}
      />

      {/* Error Message */}
      {error && <p className={styles.error}>{error}</p>}

      {/* Display selected files */}
      <div className={styles.filesList}>
        {files.map((fileData, index) => (
          <div key={index} className={styles.fileItem}>
            {/* Preview Image or PDF icon */}
            <div className={styles.filePreview}>
              {fileData.file.type.startsWith('image') ? (
                <img
                  src={fileData.preview}
                  alt="file preview"
                  className={styles.imagePreview}
                />
              ) : fileData.file.type === 'application/pdf' ? (
                <img
                  src="/pdf-icon.png" // Provide a PDF icon (replace with a real icon if necessary)
                  alt="PDF preview"
                  className={styles.pdfPreview}
                />
              ) : null}
            </div>

            {/* File name */}
            <span className={styles.fileName}>{fileData.file.name}</span>

            {/* Remove button */}
            <button
              onClick={() => handleRemoveFile(index)}
              className={styles.removeButton}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileAttachment;

