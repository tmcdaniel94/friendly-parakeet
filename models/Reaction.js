const { Schema, model } = require('mongoose');
const dayjs = require('dayjs')

// This will not be a model, but rather will be used as the reaction field's subdocument schema in the Thought model.

const reactionSchema = new Schema(
  {
    reactionId: {
      type: DataTypes.ObjectId,
      default: ObjectId,
      // default value is set to a new ObjectId
    },
    reactionBody: {
      type: DataTypes.STRING,
      required: true,
      maxLength: 280,
      // 280 character maximum
      },
    username: {
        type: DataTypes.STRING,
        required: true,
      },
    createdAt: {
      type: DataTypes.DATE,
      // set default value to current timestamp
      default: Date.now,
      // use a getter method to format the timestamp on query
      get: (val) => dayjs(val).format('YYYY-MM-DD'),
    },
  },
);

const Reaction = model('reaction', reactionSchema);
module.exports = Reaction;