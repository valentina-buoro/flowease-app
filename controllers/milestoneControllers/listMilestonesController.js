const MilestoneModel = require("../../models/milestoneModel");

async function listMilestones(req, res) {
  try {
      const milestones = await MilestoneModel.find({ collaborator: req.user.email })
      
      if (milestones.length < 1) {
        return res.status(404).json({ success: false, message: "No milestones found for you" });
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
