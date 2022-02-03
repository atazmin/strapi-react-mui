"use strict";

module.exports = {
  send: async (ctx) => {
    const { firstName, lastName, email } = ctx.request.body;

    if (!email) {
      ctx.status = 400;
      ctx.body = "Email is required";
      return;
    }

    try {
      const response = await strapi.services.mailchimp.request({
        method: "post",
        path: `/lists/${process.env.MAILCHIMP_AUDIENCE_ID}/members`,
        body: {
          email_address: email,
          status: "subscribed",
          merge_fields: {
            FNAME: firstName,
            LNAME: lastName,
          },
        },
      });
      strapi.log.debug(`Sending data from ${email} ...`);
      ctx.send({
        success: `Thank you ${firstName} ${lastName} (${email}) for your subscription!`,
      });
    } catch (error) {
      strapi.log.error(`Error sending data from ${email}`, error);
      ctx.send({
        error: `Please try again, error details: ${error.detail}`,
      });
    }
  },
};
