const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const thoughtSchema = require('./Thought')

// Schema to create User model
const userSchema = new Schema(
  {
    first: {
      type: String,
      required: true,
      max_length: 50,
    },
    last: {
      type: String,
      required: true,
      max_length: 50,
    },
     email: {
      type: String,
      required: true,
      unique:true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
      max_length: 50,
    },
    thoughts: [{
      type: Schema.Types.ObjectId,
      ref: "Thought",
    }],
    friends: [{
      type: Schema.Types.ObjectId,
      ref: "User"
    }]
  },
    
    reactions: [reactionSchema],
    
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

userSchema.virtual('friendCount').get(function (){
  return this.friends.length;
});


const User = model('user', userSchema);

module.exports = User;
