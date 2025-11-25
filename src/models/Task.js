const mongoose = require('mongoose');
const { validator } = require('validator.js');

const TaskSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Title is required'],
            maxLength: 200,
        },
        status: {
            type: String,
            enum: ['to-do', 'in-progress', 'done'],
            default: 'to-do',
        },
        dueDate: {
            type: Date,
            validate: {
                validator: function(value) {
                    if (!value) return true; // Allow empty dueDate
                    return value >= new Date();
                },
                message: 'Due date must be in the future',
            }
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    {timestamps: true}
);

module.exports = mongoose.model('Task', TaskSchema);