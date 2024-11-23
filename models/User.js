const { Schema, model } = require('mongoose');

// Create a virtual called friendCount that retrieves the length of the user's friends array field on query.

const userSchema = new Schema(
  {
    username: {
      type: DataTypes.STRING,
      required: true,
      // unique
      // trimmed
    },
    email: {
      type: DataTypes.STRING,
      required: true,
      unique: true,
    //   mongoose's matching validation
    //   validate: {
    //     isEmail: true,
    //   },
    },
    thoughts: {
        type: DataTypes.STRING,
        references: {
            model: 'thought',
        }
        // array of _id values referencing the thought model
    },
    friends: {
        type: DataTypes.STRING,        
        // array of _id values referencing the user model
    },
  },
  {
    hooks: {
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      beforeUpdate: async (updatedUserData) => {
        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
        return updatedUserData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
);

const User = model('user', userSchema);
module.exports = User;