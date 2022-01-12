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
      const createConvoQuery = await strapi
        .query('conversation')
        .create({
          participant: userId,
          otherParticipant: params.otherParticipant
        });

      createdConvo = createConvoQuery;
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
