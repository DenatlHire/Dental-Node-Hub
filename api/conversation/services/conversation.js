module.exports = {
  /**
   * Get all conversations for authenticated user 
   */
  async queryConvos(userId, params, populate) {
    const usersConvosModel = await strapi
      .query('conversation')
      .model.query(qb => {
        qb.where('participant', userId)
        qb.orWhere('otherParticipant', userId)
      })
      .fetchAll();

    return usersConvosModel.toJSON();
  },

  /**
   * Get all conversation messages if user is in the convo
   *  
   */
  async queryConvoMessages(userId, params, populate) {
    const convoQueryResp = await strapi
      .query('conversation')
      .model.query(qb => {
        qb.where('id', params.id)
      })
      .fetch();

    const convo = convoQueryResp?.toJSON();

    // User can only see the messages if they are a part of the conversation
    if (!convo || ![convo.participant.id, convo.otherParticipant.id].includes(userId)) {
      return [];
    }

    const result = await strapi
      .query('chat-message')
      .model.query(qb => {
        qb.where('conversation', params.id)
      })
      .fetchAll();

    return result.toJSON();
  },
};
