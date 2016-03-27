var express =require( 'express' ),
	mongoose =require( 'mongoose' ),
	router = express.Router();

var studentClass = new mongoose.Schema({
	classId: String,
	className: String,
	studentName: String,
	studentId: String,
	teacherName: String,
	teacherId: String,
	dateCreated: String,
	prelim: Number,
	midterm: Number,
	final: Number,
	average: Number,
	status: String
}, {collection: 'dbStudents'});

module.exports = studentClass;