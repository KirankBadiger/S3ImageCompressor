// Import required AWS SDK clients and commands for Node.js
const {
    S3Client,
    PutObjectCommand,
    CreateBucketCommand,
    GetObjectCommand
  } = require("@aws-sdk/client-s3");
  
  // Set the AWS region
  const REGION = "ap-south-1"; // e.g., "us-east-1"
  
  // Set the bucket parameters
  const bucketName = "jsthumbnailbucket";
  const bucketParams = { Bucket: bucketName };
  
  // Create name for uploaded object key
  const keyName = "70b0a05f0a65ab696887ee25ba9b0254.jpg";
  const objectParams = { Bucket: bucketName, Key: keyName };
  
  // Create an S3 client service object
  const s3 = new S3Client({ region: REGION });
  
  const run = async () => {
    try {
      const results = await s3.send(new GetObjectCommand(objectParams));
      console.log("Successfully uploaded data to " + bucketName + "/" + keyName);
    } catch (err) {
      console.log("Error", err);
    }
  };
  run();