const express = require('express')
const createMilestone = require('../controllers/milestoneControllers/createMilestoneController')
const { authenticate } = require('../middleware/authentication')
const markMilestoneStarted = require('../controllers/milestoneControllers/milestoneStartController')
const markMilestoneCompleted = require('../controllers/milestoneControllers/milestoneCompleteController')
const milestoneRouter = express.Router()

milestoneRouter.post('/:project_id/create', authenticate, createMilestone)
milestoneRouter.put('/:milestone_id/started', authenticate, markMilestoneStarted)
milestoneRouter.put('/:milestone_id/completed', authenticate, markMilestoneCompleted)

module.exports = milestoneRouter