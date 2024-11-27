const { Schema, model } = require('mongoose');

// Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: DataTypes.STRING,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    createdAt: {
      type: DataTypes.DATE,
      // set default value to current timestamp
      default: Date.now,
      // use a getter method to format the timestamp on query
      get: (val) => dayjs(val).format('YYYY-MM-DD'),
      },
    username: {
      type: DataTypes.STRING,
      required: true,
    },
    // array of nested documents created with the reactionSchema
    reactions: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Reaction',
      },
    ]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thought = model('thought', thoughtSchema);
module.exports = Thought;