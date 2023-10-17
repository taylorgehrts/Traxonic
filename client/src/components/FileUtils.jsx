import { Storage } from 'aws-amplify';

import { useParams } from 'react-router-dom';

export const handleFileUpload = async (event, realProjectId) => {
  const file = event.target.files[0];
  
  try {
    // Append projectId to the S3 key
    const s3Key = `projects/${realProjectId}/${file.name}`;
    
    // Upload the file to the S3 bucket
    const result = await Storage.put(s3Key, file);
    
    // Store the file reference in MongoDB
    const fileData = {
      title: file.name,
      url: result.key, // Use the S3 key as the URL
      
      size: file.size,
      uploadedOn: new Date(),
      projectId: projectId, // Include the projectId in the MongoDB document
    };

    // Save the file reference to MongoDB
    const newFile = await File.create(fileData);

    console.log('File uploaded successfully:', newFile);
  } catch (error) {
    console.error('Error uploading file:', error);
  }
};