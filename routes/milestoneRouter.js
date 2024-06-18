const express = require('express')
const createMilestone = require('../controllers/milestoneControllers/createMilestoneController')
const { authenticate } = require('../middleware/authentication')
const markMilestoneStarted = require('../controllers/milestoneControllers/milestoneStartController')
const markMilestoneCompleted = require('../controllers/milestoneControllers/milestoneCompleteController')
const getMilestoneById = require('../controllers/milestoneControllers/viewMilestoneController')
const getMilestoneStatusEnumValues = require('../controllers/milestoneControllers/getStatusEnumValuesController')
const updateMilestone = require('../controllers/milestoneControllers/updateMilestoneController')
const listMilestones = require('../controllers/milestoneControllers/listMilestonesController')
const filterMilestonesByProjectName = require('../controllers/milestoneControllers/filterMilestonesController')
const milestoneRouter = express.Router()

milestoneRouter.post('/:project_id/create', authenticate, createMilestone)
milestoneRouter.put('/:milestone_id/started', authenticate, markMilestoneStarted)
milestoneRouter.put('/:milestone_id/completed', authenticate, markMilestoneCompleted)
milestoneRouter.get('/:milestone_id/milestone', getMilestoneById)
milestoneRouter.get('/statuses', getMilestoneStatusEnumValues)
milestoneRouter.put('/:milestone_id/edit', authenticate, updateMilestone)
milestoneRouter.get("/", authenticate, listMilestones);
milestoneRouter.get('/filter', authenticate, filterMilestonesByProjectName) // `projectName` provided in the query string e.g '/milestones/filter?projectName=test'

module.exports = milestoneRouter