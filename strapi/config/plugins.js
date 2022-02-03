module.exports = ({ env }) => ({
  email: {
    provider: env("SENDGRID_PROVIDER"),
    providerOptions: {
      apiKey: env("SENDGRID_API_KEY"),
    },
    settings: {
      defaultFrom: env("SENDGRID_FROM_AND_REPLY_TO_ADDRESS"),
      defaultReplyTo: env("SENDGRID_FROM_AND_REPLY_TO_ADDRESS"),
    },
  },
});

module.exports = ({ env }) => {
  if (env("NODE_ENV") === "production") {
    return {
      upload: {
        provider: "aws-s3",
        providerOptions: {
          accessKeyId: env("AWS_S3_ACCESS_KEY_ID"),
          secretAccessKey: env("AWS_S3_ACCESS_SECRET"),
          region: env("AWS_S3_REGION"),
          params: {
            Bucket: env("AWS_S3_BUCKET_NAME"),
          },
        },
      },
    };
  } else {
    return {};
  }
};
