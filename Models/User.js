const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')
const schema = mongoose.Schema

const userSchema = new schema({
    username: {
        type: String,
        required:true
    },
    password: {
        type: String,
        required: true
    }
})

UserSchema.methods.isCorrectPassword = function(password, callback){
    bcrypt.compare(password, this.password, function(err, same) {
      if (err) {
        callback(err);
      } else {
        callback(err, same);
      }
    });
  }

userSchema.methods.hashPassword = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

userSchema.methods.hashPassword = function (password, hash) {
    return bcrypt.compareSync(password, hash)
}

module.exports = mongoose.model('user', userSchema, 'user')