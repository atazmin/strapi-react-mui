"use strict";

module.exports = {
  send: async (ctx, env) => {
    const { name, email, message } = ctx.request.body;

    if (!email) {
      ctx.status = 400;
      ctx.body = "Email is required";
      return;
    }

    try {
      const emailOptions = {
        to: process.env.SENDGRID_FROM_AND_REPLY_TO_ADDRESS,
        from: process.env.SENDGRID_FROM_AND_REPLY_TO_ADDRESS,
        replyTo: email,
        subject: `Message from ${name} (larisatazmin.com)`,
        html: message,
      };
      await strapi.plugins["email"].services.email.send(emailOptions);
      strapi.log.debug(`Sending data from ${email} ...`);
      ctx.send({
        success: `Thank you ${name} (${email}) your message was sent!`,
      });
    } catch (error) {
      strapi.log.error(`Error sending data from ${email}`, error);
      ctx.send({
        error: `Sorry ${name} (${email}) there was an error, please try again.`,
      });
    }
  },
};
