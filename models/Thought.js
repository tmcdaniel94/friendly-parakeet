const { Schema, model } = require('mongoose');

// Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: DataTypes.STRING,
      required: true,
      // must be between 1 and 280 characters
    },
    createdAt: {
      type: DataTypes.DATE,
      // set default value to current timestamp
      // use a getter method to format the timestamp on query
      },
    username: {
        type: DataTypes.STRING,
        required: true,
      },
    reactions: {
      // array of nested documents created with the reactionSchema
    },
  },
);

const Thought = model('thought', thoughtSchema);
module.exports = Thought;