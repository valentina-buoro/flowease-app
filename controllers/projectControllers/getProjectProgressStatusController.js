const ProjectModel = require("../../models/projectModel");
const MilestoneModel = require("../../models/milestoneModel");

async function getProjectProgressStatus(req, res) {
  try {
    const project_id = req.params.project_id;
    if (!project_id) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide project_id" });
    }
    const project = await ProjectModel.findById(project_id).select(
      "-password -__v"
    );
    if (!project) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found" });
      }

      const milestones = await MilestoneModel.find({ project_id })

      if (milestones.length < 1) {
          return res.status(200).json({success: true, message: 'No milestones'})
      }
      
      const allCompleted = milestones.every(milestone => milestone.status === 'Completed')

      if (allCompleted) {
          return res.status(200).json({success: true, message: 'Completed'})
      }

      const anyStarted = milestones.some(milestone => milestone.status === 'Started')

      if (anyStarted) {
        return res.status(200).json({success: true, message: 'Ongoing'})
    }


    res.status(200).json({ success: true, message: 'Not Started' });
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Internal server error");
  }
}

module.exports = getProjectProgressStatus;
