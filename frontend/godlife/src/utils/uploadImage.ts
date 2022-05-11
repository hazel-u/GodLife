import S3 from "aws-sdk/clients/s3";

const ACCESS_KEY = process.env.REACT_APP_S3_ACCESS_KEY;
const SECRET_ACCESS_KEY = process.env.REACT_APP_S3_SECRET_ACCESS_KEY;
const REGION = "ap-northeast-2";
const S3_BUCKET = "today.godlife";

const myBucket = new S3({
  params: { Bucket: S3_BUCKET },
  region: REGION,
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SECRET_ACCESS_KEY,
});

export const uploadImage = (file: any) => {
  const params = {
    ACL: "public-read",
    Body: file,
    Bucket: S3_BUCKET,
    Key: file.name,
  };

  return myBucket.putObject(params).promise();
};
