module.exports = {
  /**
   * Get all records where 
   */
  async createChatMessage(userId, params, populate) {
    if (!userId) {
      throw 'User is missing';
    } 
    if (!params.conversationId && !params.otherParticipant) {
      throw 'otherParticipant is missing';
    }

    let createdConvo;
    if (!params.conversationId && params.otherParticipant) {
      // No conversation id given so create a new one between the two
      const userInfo = await strapi.services['user-information'].findOne({ user_id: userId });
      // const otherUserInfo = await strapi.services['user-information'].findOne({ user_id: params.otherParticipantId });

      createdConvo = await strapi
        .query('conversation')
        .create({
          participant: userInfo.id, // user_information id
          otherParticipant: params.otherParticipant // user_information id
        });
    }

    const result = await strapi
      .query('chat-message')
      .create({
        senderId: userId,
        conversation: params.conversationId || createdConvo?.id,
        message: params.message
      })

    return result;
  },
};
