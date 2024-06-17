const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        full_name: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        verified: {
            type: Boolean,
            default: false
        },
        created_projects: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Project'
        }],
        assigned_projects: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Project'
        }],
        profile_picture: {
            type: String,
            default: "https://static.vecteezy.com/system/resources/previews/018/765/757/original/user-profile-icon-in-flat-style-member-avatar-illustration-on-isolated-background-human-permission-sign-business-concept-vector.jpg"
        }
    }, {timestamps: true}
)

userSchema.pre('save', async function (next) {
	const user = this
	try {
		if (user.isModified('password')) {
			const hashedPassword = await bcrypt.hash(user.password, 10)
			user.password = hashedPassword
		}
		next()
	} catch (error) {
		return next(error)
	}
})

module.exports = mongoose.model('User', userSchema)