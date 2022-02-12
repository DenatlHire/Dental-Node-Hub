// Only use multiple prefixes if you have two of the same root
// i.e participant and otherParticipant are of both user_informations
function generateNestedWithRelatedStringList(prefixes, nestedFieldNames) {
  const generatedStrings = [];
  for (const nestedFieldName of nestedFieldNames) {
    for (const prefix of prefixes) {
      generatedStrings.push(`${prefix}.${nestedFieldName}`);
    }
  }
  return generatedStrings;
}

module.exports = {
  /**
   * Get all conversations for authenticated user 
   */
  async queryConvos(userId, params, populate) {
    const withParticipantRelationsRelated = generateNestedWithRelatedStringList(
      ['participant', 'otherParticipant'],
      ['designation_id', 'user_id']
    );

    const usersConvosModel = await strapi
      .query('conversation')
      .model.query(qb => {
        qb.innerJoin('user_informations', function () {
          this.on('user_informations.id', '=', 'conversation.participant').orOn('user_informations.id', '=', 'conversation.otherParticipant')
        })
        qb.where('user_informations.user_id', userId)
      }).fetchAll({
        // only way to get deeply nested properties (past 1 level of nesting)
        withRelated: [...withParticipantRelationsRelated],
      });

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
      .fetch({
        // 
      });

    if (!convoQueryResp) {
      return [];
    }

    const convo = convoQueryResp.toJSON();

    // User can only see the messages if they are a part of the conversation
    if (!convo || ![convo.participant.user_id, convo.otherParticipant.user_id].includes(userId)) {
      return [];
    }

    const result = await strapi
      .query('chat-message')
      .model.query(qb => {
        qb.where('conversation', params.id)
      })
      .fetchAll({
        // Doesn't populate any relation level if empty array
        withRelated: []
      });

    return result.toJSON();
  },
};
