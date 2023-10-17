import React from 'react';
import { handleFileUpload } from './FileUtils';

function Files({ projectId }) {
  console.log('Project ID in the files.jsx:', projectId);

  return (
    <div>
      {projectId && (
        <h1 style={{ color: "#FFFFFF" }}>Files for Project {projectId}</h1>
      )}
      <input type="file" onChange={handleFileUpload} style={{ color: "#FFFFFF" }} />
    </div>
  );
}

export default Files;
