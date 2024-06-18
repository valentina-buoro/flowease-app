const MilestoneModel = require("../../models/milestoneModel");
const ProjectModel = require("../../models/projectModel");

async function updateMilestone(req, res) {
  try {
    const user_id = req.user.id;
    const milestone_id = req.params.milestone_id;
    if (!milestone_id) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide milestone_id" });
    }
    const milestone = await MilestoneModel.findById(milestone_id);
    if (!milestone) {
      return res
        .status(404)
        .json({ success: false, message: "Milestone not found" });
      }
      
      const project = await ProjectModel.findById(milestone.project_id)
      if (!project) {
        return res
          .status(404)
          .json({ success: false, message: "Project not found" });
      }
      
    if (project.user_id != user_id) {
      return res
        .status(403)
        .json({
          success: false,
          message: "You are not the owner of this project",
        });
    }

      const { name, description, due_date, collaborator } = req.body;

      if (due_date) {
        const dueDateTimestamp = parseInt(due_date, 10); // frontend sends unix timestamp as a string
        

        if (isNaN(dueDateTimestamp) || dueDateTimestamp <= Date.now()) {
            return res.status(400).json({ success: false, message: "Please provide a valid future date for the milestone" });
        }

        const projectStartDate = parseInt(new Date(project.start_date).getTime(), 10)
        const projectEndDate = parseInt(new Date(project.end_date).getTime(), 10)

        if (dueDateTimestamp < projectStartDate || dueDateTimestamp > projectEndDate) {
            return res.status(400).json({success: false, message: 'Due date must be within project start and end dates'})
          }
          
          milestone.due_date = due_date
      }
      
      if (collaborator) {
        if (!project.collaborators.includes(collaborator)) {
            return res.status(403).json({success: false, message: "Please assign milestone to a project collaborator"})
          }

          if (collaborator !== milestone.collaborator) {
              milestone.collaborator = collaborator
          }
      }
      
      if (name) milestone.name = name
      
      if (description) milestone.description = description
      
      const updatedMilestone = await milestone.save()

      if (collaborator && collaborator !== milestone.collaborator) {
        // emit a notification to client when milestone is updated with new collaborator
    const io = req.io;
    if (io) {
      io.emit("milestone_updated", {
        type: "milestone_updated",
        message: `You have been assigned a milestone with name: '${updatedMilestone.name}' on project: '${project.name}'`,
        project_id: project._id,
        milestone_id: updatedMilestone._id,
        creator_id: project.user_id,
        collaborator,
      });
    }
    }

    res
      .status(200)
      .json({ success: true, message: "Milestone updated successfully", updatedMilestone });
  } catch (error) {
    console.error(error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
}

module.exports = updateMilestone;
