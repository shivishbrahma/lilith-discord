module.exports = function (msg, args) {
	if (args.length === 0) return 'Provide command name';
	if (Object.keys(this).includes(args[0])) {
		this[args[0]](msg, ['help']);
	}
};
