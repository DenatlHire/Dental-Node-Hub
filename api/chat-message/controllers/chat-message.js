'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */
const {
  sanitizeEntity
} = require('strapi-utils');

module.exports = {
  index: async (ctx, next) => {
    return true;
  },

  customCreate: async (ctx, next) => {
    const entity = await strapi.services['chat-message'].createChatMessage(ctx.state.user?.id, ctx.request.body);
    return sanitizeEntity(entity, {
      model: strapi.models['chat-message']
    });
  },
};


// POST REQUEST
  /***
 * {
      "message": "oi oi",
      "otherParticipant": 1,
      "conversationId": 5, // if no convo id we create new one
    }
  */