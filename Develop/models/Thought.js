const { Schema, Types, model } = require('mongoose');

const reactionSchema = require('./Reaction')

//Thought Schema
const thoughtSchema = new Schema({

    thoughtText: {
        type: String, 
        required: true, 
        minlength: 1, 
        maxLength: 280},

    createdAt: {
        type: Date, 
        default: Date.now,
        get: (date) => date.toLocaleDateString("en-US"),
    },

    //The user that created the thought
    username: {
        type: String, 
        required: true
    },

    //Reactions from other users
    reactions: [reactionSchema],
},
{
    toJSON: {
        getters: true,
    },
    id: false,
}
);

//Create virtual `reactionCount`, retrieves the length of the thought's `reactions` array field.
thoughtSchema.virtual('reactionCount')
.get(function(){
    return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);


module.exports = Thought;