const mongoose = require('mongoose');
var contact = new mongoose.Schema({ ten: 'string', tuoi: 'number' },{collection:'contact'});
module.exports =  mongoose.model('contact', contact);
