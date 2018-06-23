const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// export const startDB = mongoose.connect('mongodb://emmaleepk:EPK123@ds237770.mlab.com:37770/gymdb');
mongoose.connect('mongodb://emmaleepk:EPK123@ds237770.mlab.com:37770/gymdb').then(() => console.log('MongoDB Connected')).catch(err => console.log(err));
