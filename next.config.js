const path = require('path');

console.log(path.join(__dirname, 'src', 'styles'))
module.exports = {
	reactStrictMode: true,
	sassOptions: {
		includePaths: [path.join(__dirname, 'src', 'styles'), path.join(__dirname, 'src', 'styles', 'grid')],
	},
};
