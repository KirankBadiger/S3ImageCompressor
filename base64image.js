var AWS = require('aws-sdk');
var s3Bucket = new AWS.S3( { params: {Bucket: 'jsthumbnailbucket'} } );

buf = Buffer.from(req.body.imageBinary.replace(/^data:image\/\w+;base64,/, ""),'base64')
var data = {
  Key: process.env[3], 
  Body: buf,
  ContentEncoding: 'base64',
  ContentType: 'image/jpeg'
};
s3Bucket.putObject(data, function(err, data){
    if (err) { 
      console.log(err);
      console.log('Error uploading data: ', data); 
    } else {
      console.log('successfully uploaded the image!');
    }
});