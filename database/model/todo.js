const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todo = new Schema({
	userId: {
		type: mongoose.SchemaTypes.ObjectId,
		ref: 'user'
	},
	todoContent: String,
	isAchieve: {
    type: Boolean,
    default: false
  }
}, {
	versionKey: false,
	timestamps: {
		createdAt: 'createTime',
		updatedAt: 'updateTime'
	}
})

module.exports = mongoose.model('todo', todo);