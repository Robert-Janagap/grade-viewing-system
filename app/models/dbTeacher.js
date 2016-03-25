var express =require( 'express' ),
	mongoose =require( 'mongoose' ),
	router = express.Router();

var teacherClass = new mongoose.Schema({
	classId: String,
	className: String,
	teacherName: String,
	teacherId: String,
	dateCreated: String,
	status: String,
	cPrelim: Number,
	cMidterm: Number,
	cFinal: Number,
	students:{
		studentName: String,
		studentId: String,
		prelim: Number,
		midterm: Number,
		final: Number,
		confirm: String
	}
}, {collection: 'dbTeachers'});

module.exports = teacherClass;