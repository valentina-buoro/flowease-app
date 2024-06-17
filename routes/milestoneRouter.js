const express = require('express')
const createMilestone = require('../controllers/milestoneControllers/createMilestoneController')
const { authenticate } = require('../middleware/authentication')
const markMilestoneStarted = require('../controllers/milestoneControllers/milestoneStartController')
const markMilestoneCompleted = require('../controllers/milestoneControllers/milestoneCompleteController')
const getMilestoneById = require('../controllers/milestoneControllers/viewMilestoneController')
const listMilestones = require('../controllers/milestoneControllers/listMilestonesController')
const getMilestoneStatusEnumValues = require('../controllers/milestoneControllers/getStatusEnumValuesController')
const milestoneRouter = express.Router()

milestoneRouter.post('/:project_id/create', authenticate, createMilestone)
milestoneRouter.put('/:milestone_id/started', authenticate, markMilestoneStarted)
milestoneRouter.put('/:milestone_id/completed', authenticate, markMilestoneCompleted)
milestoneRouter.get('/:milestone_id/milestone', getMilestoneById)
milestoneRouter.get("/", authenticate, listMilestones); // `projectName` provided in the query string e.g '/milestones?projectName=test'
milestoneRouter.get('/statuses', getMilestoneStatusEnumValues)

module.exports = milestoneRouter