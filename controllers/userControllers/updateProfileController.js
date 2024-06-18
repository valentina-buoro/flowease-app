const UserModel = require('../../models/userModel');

async function updateUser(req, res) {
    try {
        const { email, full_name, password } = req.body
        
        const user_id = req.user.id
        const user = await UserModel.findById(user_id).select('-password -__v')
        if (!user) {
            return res.status(404).json({success: false, message: 'User not found'})
        }
  
      if (email) user.email = email
      if (full_name) user.full_name = full_name
      if (password) user.password = password
      if (req.file) {
        const profile_picture_url = req.file.path
        user.profile_picture = profile_picture_url
      }
  
      const updatedUser = await user.save()
  
      res.status(200).json({success: true, message: updatedUser})
      
    } catch (error) {
      console.error(error.message);
      res.status(500).json({success: false, message: 'Internal server error'})
    }
}
  
module.exports = updateUser;