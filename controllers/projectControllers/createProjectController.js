const ProjectModel = require("../../models/projectModel");
const UserModel = require("../../models/userModel");
const { buildEmailTemplate, sendMail } = require("../../utils/sendMail");

async function createProject(req, res) {
  try {
      const user_id = req.user.id;
      const user = await UserModel.findById(user_id).select('-password -__v')
        if (!user) {
            return res.status(404).json({success: false, message: 'User not found'})
      }
      
    const { name, description, collaborators, start_date, end_date } = req.body;
    if (!name || !description || !collaborators || !start_date || !end_date) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide required fields" });
      }
      
        const projectNameRegex = /^[a-zA-Z0-9\s!#$+,-.@_]+$/;

      // Validate project name
    if (!projectNameRegex.test(name)) {
        return res.status(400).json({ success: false, message: "Project name contains invalid characters. Only alphabets, numbers and symbols !#$+,-.@_ are allowed" });
      }

    // parse and validate dates
    const startDateTimestamp = parseInt(start_date, 10);
    const endDateTimestamp = parseInt(end_date, 10);

    if (isNaN(startDateTimestamp)) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide valid start date" });
    }
    if (isNaN(endDateTimestamp)) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide valid end date" });
    }

    if (startDateTimestamp <= Date.now()) {
      return res
        .status(400)
        .json({ success: false, message: "Start date must be in the future" });
    }

    if (endDateTimestamp <= startDateTimestamp) {
      return res
        .status(400)
        .json({
          success: false,
          message: "End date must be after the start date",
        });
    }

    
    /**
     * Check that added collaborators are registered.
     * If not, do not create the project; return a response and send the unregistered collaborators invite mails
     */
  
    const unregisteredCollaborators = []
    // const unverifiedCollaborators = []
    const collaboratorEmails = await Promise.all(
        collaborators.map(async collaborator => {
            const user = await UserModel.findOne({email: collaborator})
            if (!user) {
              unregisteredCollaborators.push(collaborator)
              console.log('unregistered collab', collaborator)
                 return
            }
            // if (user && (user.verified === false || user.verified === undefined || user.verified === null)) {
            //     unverifiedCollaborators.push(user.email)
            //     return
            // }
            console.log('registered collab:', user.email);
            return user.email
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
      

      return res.status(404).json({success: false, message: `Project creation failed because of unregistered collaborator: ${unregisteredCollaborators.join(', ')}. An invite  has been sent to their email.`})
    }
    /**
     * previously, i threw an error which i caught in
     * the catch block cos i wanted to allow the project
     * creation to go through
     */
    // if (unverifiedCollaborators.length> 0) {
    //     throw new Error(`These collaborators are unverified: ${unverifiedCollaborators.join(', ')}`)
    // }

    console.log("collab emails:", collaboratorEmails);

    const project = new ProjectModel({
      name,
      description,
      user_id,
      collaborators: collaboratorEmails,
      // collaborators,
      start_date,
      end_date,
    });

    await project.save();

    // push the created project into the project owner's array
    await UserModel.findByIdAndUpdate(user_id, {
      $push: { created_projects: project._id },
    });

    // push the assigned projects into the collaborators' arrays
    await Promise.all(
      collaborators.map(async (collaborator) => {
        const assignedCollaborator = await UserModel.findOne({
          email: collaborator,
        });
        const assignedCollaboratorId = assignedCollaborator._id;
        await UserModel.findByIdAndUpdate(assignedCollaboratorId, {
          $push: { assigned_projects: project._id },
        });
      })
    );

    // emit a notification to client when project is created
    const io = req.io;
    if (io) {
      io.emit("project_created", {
        type: "project_created",
        message: `You have been added to a new project with name: ${project.name}`,
        project_id: project._id,
        creator_id: user_id,
        collaborators: collaboratorEmails,
        start_date,
        end_date,
      });
      }
      
    
    //  send emails to all registered collaborators
      for (const collaborator of collaboratorEmails) {
        const collaboratorName = (await UserModel.findOne({email: collaborator})).full_name
      const emailOption = {
        to: collaborator,
        from: "FlowEase",
        subject: "You Have Been Added to a Project",
        html: await buildEmailTemplate("projectAssignment.ejs", {projectName: project.name, projectCreatorName: user.full_name, collaboratorName}),
      };
      await sendMail(emailOption, res);
    }

    res
      .status(201)
      .json({ success: true, message: "Project created successfully" });
  } catch (error) {
    console.error(error.message);
    // if (error.message.includes('These collaborators do not exist:')) {
    //     return res.status(404).json({success: false, message: error.message})
    // }
    // if (error.message.includes('These collaborators are unverified:')) {
    //     return res.status(403).json({success: false, message: error.message})
    // }
    res.status(500).json("Internal server error");
  }
}

module.exports = createProject;
