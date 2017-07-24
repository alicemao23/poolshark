const mongoose = require('mongoose'),
	Schema = mongoose.Schema;

const poolSchema = new Schema({
	location: {
		coords: [ ],
		address: {
			province: {type: String, required: true}
		}
	}
});

const poolModel = mongoose.model("Pool", poolSchema);

module.exports = {
	model: poolModel,
	schema: poolSchema
};
