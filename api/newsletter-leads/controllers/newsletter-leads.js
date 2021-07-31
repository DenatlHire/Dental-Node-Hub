'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

const { parseMultipartData, sanitizeEntity } = require('strapi-utils');

module.exports = {
    async create(ctx) {
        let entity;
        if (ctx.is('multipart')) {
            const { data, files } = parseMultipartData(ctx);
            entity = await strapi.services['newsletter-leads'].create(data, { files });
        } else {
            entity = await strapi.services['newsletter-leads'].create(ctx.request.body);
        }
        entity = sanitizeEntity(entity, { model: strapi.models['newsletter-leads'] });

        //send email
        const emailTemplate = {
            subject: 'Thank you for subscribing our newsletter',
            text: `Welcome!
            You are now subscribe to our newsletter. 
            
            Your registered email address is: <%= user.email %>
            
            Thank You.`,

            html: `<h1>Welcome!</h1>
              <p>You are now subscribe to our newsletter. <br/>
              Your registered email address is: <%= user.email %> <br/>
              Thank you.</p>`,
        };

        await strapi.plugins.email.services.email.sendTemplatedEmail(
            {
                to: entity.email,
            },
            emailTemplate,
            {
                user: entity,
            }
        );

        return entity;
    },
};

