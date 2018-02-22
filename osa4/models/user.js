const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  userName: String,
  realName: String,
  passwordHash: String,
  adult: Boolean,
  blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }]
})

userSchema.statics.Format = function (user) {
  return {
    userName: user.userName,
    realName: user.realName,
    passwordHash: user.passwordHash,
    adult: user.adult,
    id: user._id,
    blogs: user.blogs
  }
}

const User = mongoose.model('User', userSchema)

module.exports = User