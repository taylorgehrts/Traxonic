import React from 'react';

function Files({ handleFileUpload }) {
  return (
    <div>
      <h1>Files</h1>
      <input type="file" onChange={handleFileUpload} />
    </div>
  );
}

export default Files;
