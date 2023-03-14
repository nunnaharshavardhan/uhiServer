const mongoose = require("mongoose");

const UserDetailsScehma = new mongoose.Schema(
  {
    fname: String,
    lname: String,
    aadhar:Number,
    email: { type: String, unique: true },
    password: String,
    dob:String,
    phonenumber:{type:Number,unique:true},
    gender: String,
    dateOfCreation:{type:Date,default: Date.now}
  },
  {
    collection: "patientData",
  }
);

mongoose.model("patientData", UserDetailsScehma);