const mongoose = require("mongoose");
const { Student } = require("./UsersModel");

const certificateApplicationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    admissionNo: {
        type: Number,
        required: true
    },
    regNo:{
        type: String,
        required: true
    },
    program:{
        type:String,
        required: true
    },
    purpose:{
        type:String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    phoneNumber:{
        type:Number,
        required: true
    },
    scholarship: {
        type: String,
        required: true
    },
    certificateType: {
        type: [String],
    },
    photo: {
        type: String,
    },
    semester: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    from: {
        type: mongoose.Types.ObjectId,
    },
    to: {
        type: mongoose.Types.ObjectId,
    }, 
    studentId: {
        type: mongoose.Types.ObjectId,
        ref: Student
    },
    remarks: {
        type: String
    }
});

const CertificateApplication = mongoose.model('CertificateApplication', certificateApplicationSchema);

module.exports = { CertificateApplication };