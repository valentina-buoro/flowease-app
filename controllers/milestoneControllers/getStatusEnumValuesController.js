const MilestoneModel = require("../../models/milestoneModel");
const { getEnumValues } = require("../../utils/getEnumValues");

async function getMilestoneStatusEnumValues(req, res) {
  try {
      const statuses = await getEnumValues(MilestoneModel.schema, 'status')
    //   const statuses = MilestoneModel.schema.path('status').enumValues

       res.status(200).json({ success: true, message: statuses });
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Internal server error");
  }
}

module.exports = getMilestoneStatusEnumValues;
