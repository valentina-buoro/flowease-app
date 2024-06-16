const ProjectModel = require("../../models/projectModel");

async function listMilestones(req, res) {
  try {
    const user_id = req.user.id;
      const projectName = decodeURIComponent(req.query.projectName);
      console.log(projectName);
    if (!projectName) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide the project name" });
    }

    const projects = await ProjectModel.find({
        name: { $regex: new RegExp(projectName, "i") }, // case-insensitive search
        $or: [
          { user_id: user_id },
          { collaborators: { $in: [req.user.email] } }
        ]
    }).populate('milestones');
    
      if (projects.length < 1) {
        return res
      .status(400)
      .json({ success: false, message: "No project with the provided name was found" })
    }
      
      const milestones = projects.reduce((acc, project) => {
          acc.push(...project.milestones)
          return acc
      }, [])

      if (milestones.length < 1) {
        return res
      .status(400)
      .json({ success: false, message: "No milestone for the provided project was found" })
    }
    
    res
      .status(200)
      .json({ success: true, message: milestones });
  } catch (error) {
    console.error(error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
}

module.exports = listMilestones;
