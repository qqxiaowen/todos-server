const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = new Schema({
  username: {
    type: String,
    require: true
  },
  password: String,
  desc: {
    type: String,
    default: '这个人很懒，什么都没有写~'
  },
  sex: Number,
  nickname: String
}, {
  versionKey: false,
  timestamps: {
    createdAt: 'createTime',
    updatedAt: 'updateTime'
  }
})

module.exports = mongoose.model('user', user);