const Mailchimp = require("mailchimp-api-v3");

module.exports = (strapi) => {
  return {
    async initialize() {
      const { api_key } = strapi.config.get("hook.settings.mailchimp");
      strapi.services.mailchimp = new Mailchimp(api_key);
    },
  };
};
