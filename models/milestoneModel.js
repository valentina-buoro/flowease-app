const mongoose = require('mongoose')

const milestoneSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    due_date: {
        type: Date,
        required: true
    },
    project_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    collaborator: {
        type: String
    },
    status: {
        type: String,
        enum: ['Not started', 'Started', 'Completed'],
        required: true,
        default: 'Not started'
    }
}, {timestamps: true})

module.exports = mongoose.model('Milestone', milestoneSchema)
