'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */
const {
  sanitizeEntity
} = require('strapi-utils');

module.exports = {
  // Get all conversations for this user
  index: async (ctx, next) => {
    const userInfo = await strapi.services['user-information'].findOne({ user_id: ctx.state.user.id });
    const entities = await strapi.services.conversation.queryConvos(userInfo.id, ctx.params);

    return entities.map(entity => sanitizeEntity(entity, {
      model: strapi.models['conversation']
    }));
  },

  messages: async (ctx, next) => {
    const entities = await strapi.services.conversation.queryConvoMessages(ctx.state.user.id, ctx.params);

    return entities.map(entity => sanitizeEntity(entity, {
      model: strapi.models['chat-message']
    }));
  },
};
