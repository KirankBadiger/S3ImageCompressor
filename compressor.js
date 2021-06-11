const compress_images = require("compress-images");
var AWS = require('aws-sdk');


  // Set the AWS region
  const REGION = "ap-south-1";

  // Set the bucket parameters
  const bucketName = "jsthumbnailbucket";
  const bucketParams = { Bucket: bucketName };

  const s3 = new S3Client({ region: REGION });

  let compressed = "compressedImages/";

  const keyName = "image1.jpg";
  const objectParams = { Bucket: bucketName, Key: compressed + keyName };
  let OUTPUT_path = compressed;

const run = async () => {
  try {
    const results = await s3.send(new PutObjectCommand(objectParams));
    console.log("Successfully uploaded data to " + bucketName + "/" + keyName);
  } catch (err) {
    console.log("Error", err);
  }
}

compress_images(keyName, OUTPUT_path, { compress_force: false, statistic: true, autoupdate: true }, false,
                { jpg: { engine: "mozjpeg", command: ["-quality", "60"] } },
                { png: { engine: "pngquant", command: ["--quality=20-50", "-o"] } },
                { svg: { engine: "svgo", command: "--multipass" } },
                { gif: { engine: "gifsicle", command: ["--colors", "64", "--use-col=web"] } },
  function (error, completed, statistic) {
    console.log("-------------");
    console.log(error);
    console.log(completed);
    console.log(statistic);
    console.log("-------------");
    run();
  }
);