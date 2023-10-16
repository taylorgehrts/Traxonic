import { Storage } from 'aws-amplify';

export const handleFileUpload = async (event) => {
  const file = event.target.files[0];

  try {
    // Upload the file to the root of the S3 bucket
    const result = await Storage.put(file.name, file);
    console.log('File uploaded successfully:', result);
  } catch (error) {
    console.error('Error uploading file:', error);
  }
};