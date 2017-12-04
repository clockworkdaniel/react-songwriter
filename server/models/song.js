import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const songSchema = new Schema ({
	title: String,
	author: String,
	id: String
});