const ClockingModel = require("../../models/clockingModel");
const ProjectModel = require("../../models/projectModel");

async function clockin (req, res) {
  try {
      const user_id = req.user.id
      const project_id = req.body.project_id

      if (!project_id) {
        return res.status(400).json({success: false, message: 'Please provide project_id'})
    }
    const project = await ProjectModel.findById(project_id)
    if (!project) {
        return res.status(404).json({success: false, message: 'Project not found'})
      }
      
      if (!project.collaborators.includes(req.user.email)) {
        return res.status(403).json({success: false, message: "You are not a collaborator on this project"})
    }

      //   check that the user is not clocked in on a project
      const activeClocking = await ClockingModel.findOne({ user_id, clock_out: { $exists: false } })
      if (activeClocking) {
          return res.status(403).json({success: false, message: 'Please clock out or take a break from the current project before clocking in to a new one.'})
      }

      const clocking = new ClockingModel({
          user_id,
          project_id,
          clock_in: new Date()
      })

      await clocking.save()

      res.status(201).json({ success: true, message: `You have clocked in successfully for the project: ${project.name}`, clocking });
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Internal server error");
  }
}

module.exports = clockin;
