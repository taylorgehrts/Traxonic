import React from 'react';

function Projects({ handleFileUpload }) {
  return (
    <div>
      <h1>Home</h1>
      <input type="file" onChange={handleFileUpload} />
    </div>
  );
}

export default Projects;
