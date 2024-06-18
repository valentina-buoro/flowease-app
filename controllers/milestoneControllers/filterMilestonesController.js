const ProjectModel = require("../../models/projectModel");
const UserModel = require("../../models/userModel");
const MilestoneModel = require("../../models/milestoneModel");

async function filterMilestonesByProjectName(req, res) {
  try {
    const user_id = req.user.id;
    const user = await UserModel.findById(user_id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
      }
      
      const projectName = decodeURIComponent(req.query.projectName);
      console.log(projectName);
    if (!projectName) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide the project name" });
      }
      
    const projects = await ProjectModel.find({
        name: { $regex: new RegExp(projectName, "i") },
        $or: [
          { user_id: user_id },
          { collaborators: { $in: [req.user.email] } }
        ]
    });
      
    if (projects.length < 1) {
        return res
      .status(400)
      .json({ success: false, message: "No project with the provided name was found for you" })
      }
      
      const milestones = await MilestoneModel.find({
        collaborator: req.user.email,
        project_id: { $in: projects.map(project => project._id) }
      });

      if (milestones.length < 1) {
        return res
      .status(400)
      .json({ success: false, message: "No milestone for the provided project was found for you" })
    }

    res.status(200).json({ success: true, message: milestones });
  } catch (error) {
    console.error(error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
}

module.exports = filterMilestonesByProjectName;
