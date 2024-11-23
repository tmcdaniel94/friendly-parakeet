const { Schema, model } = require('mongoose');

const reactionSchema = new Schema(
  {
    reactionId: {
      type: DataTypes.ObjectId,
      // default value is set to a new ObjectId
    },
    reactionBody: {
      type: DataTypes.STRING,
      required: true,
      // 280 character maximum
      },
    username: {
        type: DataTypes.STRING,
        required: true,
      },
    createdAt: {
      type: DataTypes.DATE,
      // set default value to current timestamp
      // use a getter method to format the timestamp on query
    },
  },
);

// This will not be a model, but rather will be used as the reaction field's subdocument schema in the Thought model.

const Reaction = model('reaction', reactionSchema);
module.exports = Reaction;