
//const {MongoClient} = require('mongodb');
const mongoose=require('mongoose')
const express = require('express');
const cors = require('cors');
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const DATABASE_ACCESS=process.env.DATABASE_ACCESS
const PORT= process.env.PORT || 8000

const jwt = require("jsonwebtoken");
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

const JWT_SECRET =
  "hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jbkj?[]]pou89ywe";

/*async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
}; */
async function main() {
// we'll add code here soon

const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
 }
 
 app.use(cors(corsOptions))
 app.use(express.json())

//const uri="mongodb+srv://HarshaVardhanNunna:uhiBackend@uhiBackend.kxvw4yw.mongodb.net/?retryWrites=true&w=majority";
//const client = new MongoClient();
mongoose.connect(DATABASE_ACCESS,{
    useNewUrlParser:true,
}).then(()=>{
    console.log("Connected to Database");
})
.catch((e)=>console.log(e));

require("./models/userDetails");

const User = mongoose.model("patientData");
app.listen(PORT, () => {
    console.log(`Server is running on port 8000.`);
  });
app.post("/register",async(req,res)=>{
    const {fname, lname, aadhar,email, password,dob,phonenumber,gender} =req.body;
    try{
        const oldUser = await User.findOne({ email });

        if (oldUser) {
          return res.json({ error: "User Exists" });
        }
        await User.create({
          fname,
          lname,
          aadhar,
          email,
          password,
          dob,
          phonenumber,
          gender,
        });
        res.send({ status: "ok" });
    }
    catch (error)
    {   console.log(error)
        console.log(phonenumber)
        res.send({ status: "error" });

    }
})

app.post("/login-user", async (req, res) => {
    const { email, password } = req.body;
  
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ error: "User Not found" });
    }
    if (password==user.password) {
      const token = jwt.sign({ email: user.email }, JWT_SECRET, {
        expiresIn: "15m",
      });
  
      if (res.status(201)) {
        return res.json({ status: "ok", data: token });
      } else {
        return res.json({ error: "error" });
      }
    }
    res.json({ status: "error", error: "InvAlid Password" });
  });

}

main().catch(console.error);
