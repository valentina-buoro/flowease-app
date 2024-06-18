const ProjectModel = require("../../models/projectModel");
const UserModel = require("../../models/userModel");
const { buildEmailTemplate, sendMail } = require("../../utils/sendMail");

async function updateProject(req, res) {
  try {
      const user_id = req.user.id;
      const project_id = req.params.project_id;
    const user = await UserModel.findById(user_id).select("-password -__v");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

      const { name, description, collaborators, start_date, end_date } = req.body;
      
    if (!project_id) {
        return res.status(400).json({ success: false, message: 'Please provide project_id' });
      }
      
      const project = await ProjectModel.findById(project_id);
        if (!project) {
            return res.status(404).json({ success: false, message: 'Project not found' });
      }
      
      if (project.user_id.toString() !== user_id) {
        return res.status(403).json({ success: false, message: 'You are not the owner of this project' });
    }

    const projectNameRegex = /^[a-zA-Z0-9\s!#$+,-.@_]+$/;

    // Validate project name
    if (name && !projectNameRegex.test(name)) {
        return res.status(400).json({ success: false, message: "Project name contains invalid characters. Only alphabets, numbers and symbols !#$+,-.@_ are allowed" });
      }

    // parse and validate dates
    const startDateTimestamp = parseInt(start_date, 10);
    const endDateTimestamp = parseInt(end_date, 10);

    if (start_date && isNaN(startDateTimestamp)) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide valid start date" });
    }
    if (end_date && isNaN(endDateTimestamp)) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide valid end date" });
    }

    if (start_date && startDateTimestamp <= Date.now()) {
      return res
        .status(400)
        .json({ success: false, message: "Start date must be in the future" });
    }

    if (end_date && endDateTimestamp <= startDateTimestamp) {
      return res
        .status(400)
        .json({
          success: false,
          message: "End date must be after the start date",
        });
      }
      
       // handle collaborators
       const existingCollaborators = project.collaborators;
      const newCollaborators = collaborators || [];
      
       // find collaborators to add
       const collaboratorsToAdd = newCollaborators.filter(email => !existingCollaborators.includes(email));
        
       // find collaborators to remove
    const collaboratorsToRemove = existingCollaborators.filter(email => !newCollaborators.includes(email));
    
    /**
     * Check that newly added collaborators are registered.
     * If not, do not update the project; return a response and send the unregistered collaborators invite mails
     */

    const unregisteredCollaborators = []
    await Promise.all(
      newCollaborators.map(async collaborator => {
            const user = await UserModel.findOne({email: collaborator})
            if (!user) {
                 unregisteredCollaborators.push(collaborator)
                 return
            }
        })

    )
    if (unregisteredCollaborators.length > 0) {
      //  send emails to all unregistered collaborators
      for (const collaborator of unregisteredCollaborators) {
      const emailOption = {
        to: collaborator,
        from: "FlowEase",
        subject: "An Attempt to Add You to a Project",
        html: await buildEmailTemplate("attemptedProjectAssignment.ejs", {projectCreatorName: user.full_name}),
      };
      await sendMail(emailOption, res);
      }
      

      return res.status(404).json({success: false, message: `Project update failed because of unregistered collaborator: ${unregisteredCollaborators.join(', ')}`})
    }

      // update project
      project.name = name || project.name;
      project.description = description || project.description;
      project.start_date = startDateTimestamp || project.start_date;
      project.end_date = endDateTimestamp || project.end_date;
      project.collaborators = newCollaborators;

      await project.save();

       // update user assigned_projects
       await Promise.all(collaboratorsToAdd.map(async (email) => {
        const user = await UserModel.findOne({ email });
        if (user) {
            user.assigned_projects.push(project._id);
            await user.save();
        }
    }));

    await Promise.all(collaboratorsToRemove.map(async (email) => {
        const user = await UserModel.findOne({ email });
        if (user) {
            user.assigned_projects = user.assigned_projects.filter(projId => projId.toString() !== project._id.toString());
            await user.save();
        }
    }));
      
      // emit a notification to client when project is updated
      const io = req.io;
      if (io) {
          io.emit("project_updated", {
              type: "project_updated",
              message: `The project - ${project.name} - has been updated`,
              project_id: project._id,
              creator_id: user_id,
              collaborators: newCollaborators,
              start_date,
              end_date,
          });
      }

       // send email notifications to new collaborators
       const projectCreator = await UserModel.findById(user_id);
      for (const collaborator of collaboratorsToAdd) {
        const collaboratorName = (await UserModel.findOne({email: collaborator})).full_name
           const emailOption = {
               to: collaborator,
               from: "FlowEase",
               subject: "You Have Been Added to a Project",
               html: await buildEmailTemplate("projectAssignment.ejs", {projectName: project.name, projectCreatorName: user.full_name, collaboratorName}),
           };
           await sendMail(emailOption, res);
       }


       res.status(200).json({ success: true, message: 'Project updated successfully', project });
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Internal server error");
  }
}

module.exports = updateProject;
