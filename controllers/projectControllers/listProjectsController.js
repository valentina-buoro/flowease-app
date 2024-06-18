const UserModel = require("../../models/userModel");

async function listProjects(req, res) {
  try {
    const user_id = req.user.id;
    const user = await UserModel.findById(user_id)
        .populate({
            path: 'created_projects',
            populate: {
                path: 'milestones'
            }
    })
        .populate({
            path: 'assigned_projects',
            populate: {
                path: 'milestones'
            }
    })
    .exec()
    
    if (!user) {
        return res.status(404).json({success: false, message: 'User not found'})
      }
      
      const projects = {
          created_projects: user.created_projects,
          assigned_projects: user.assigned_projects
    }

    res
      .status(200)
      .json({ success: true, message: projects });
  } catch (error) {
    console.error(error.message);
   
    res.status(500).json("Internal server error");
  }
}

module.exports = listProjects;
