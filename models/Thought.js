const { Schema, model } = require('mongoose');
const dayjs = require('dayjs')

// Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.
const reactionSchema = new Schema(
    {
      reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
      },
      reactionBody: {
        type: String,
        required: true,
        maxLength: 280,
      },
      username: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (val) => dayjs(val).format('YYYY-MM-DD'),
      },
    },
    {
      toJSON: {
        getters: true,
      },
      id: false,
    }
);

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280,
        },
        createdAt: {
            type: Date,
            // set default value to current timestamp
            default: Date.now,
            // use a getter method to format the timestamp on query
            get: (val) => dayjs(val).format('YYYY-MM-DD'),
        },
        username: {
            type: String,
            required: true,
        },
        // array of nested documents created with the reactionSchema
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = model('thought', thoughtSchema);
module.exports = Thought;