import React from 'react';
import { useParams } from 'react-router-dom';
import { handleFileUpload } from './FileUtils';  // Update the path accordingly

function Files() {
  const { projectId } = useParams();

  console.log('Project ID:', projectId);

  return (
    <div>
      <h1>Files for Project {projectId}</h1>
      <input type="file" onChange={handleFileUpload} />
    </div>
  );
}

export default Files;
