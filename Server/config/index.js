import mongoose from 'mongoose';
import User from './user.js';

mongoose.Promise = global.Promise;

export const startDB = mongoose.connect('mongodb://emmaleepk:EPK123@ds237770.mlab.com:37770/gymdb');

export const models = {
  User
}
