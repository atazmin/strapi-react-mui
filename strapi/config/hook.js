module.exports = ({ env }) => ({
  settings: {
    mailchimp: {
      enabled: true,
      api_key: env("MAILCHIMP_API_KEY"),
    },
  },
});
