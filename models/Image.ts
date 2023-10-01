var mongoose = require('mongoose');
var imageSchema = new mongoose.Schema({
	img:
	{
		data: Buffer,
		contentType: String
	}
});

const Image = mongoose.model('Image', imageSchema);
export default Image;