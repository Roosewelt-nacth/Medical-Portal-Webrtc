import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';


const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/MedicalPortal',{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

const db=mongoose.connection;
db.on('error',console.error.bind(console,'connection error'));
db.once('open',()=>{
    console.log("Connected to MongoDB");
});

const UserSchema=mongoose.Schema({
    Username : {type:String , Required:true , unique:true},
    Password : {type:String , Required:true },
    Email : {type:String , Required:true , unique:true},
    Phone : {type:String , Required:true , unique:true},
    Gender : {type:String , Required:true }
})

const UserData =mongoose.model('UserSchema',UserSchema);

app.post('/normalUserAdd',async(req,res)=>{
    try{
        const {username,password,email,phone,gender} = req.body;
        const existingUser=await UserData.findOne({Username : username});
        if(existingUser){
            return res.status(400).json({error:'Username Already exist'});
        }
        const newUser=new UserData({Username : username, Password : password,Email:email,Phone:phone,Gender:gender});
        await newUser.save();
        res.status(200).json({message:'Successfully Saved in Normal User'})
    }catch(error){
        console.error('error registering the user : ',error);
        res.status(500).json({error:'Internal Server Error'});
    }
})

const DoctorSchema = mongoose.Schema({
    Username : {type:String , Required:true , unique:true},
    Password : {type:String , Required:true },
    DoctorName : {type:String , Required:true },
    Description : {type:String , Required:true },
    Email : {type:String , Required:true , unique:true},
    Phone : {type:String , Required:true , unique:true},
    Gender : {type:String , Required:true }
})

const DoctorData=mongoose.model('DoctorSchema',DoctorSchema);

app.post('/doctorUserAdd',async(req,res)=>{
    try{
        const {Username,Password,DoctorName,Description,Email,Phone,Gender}=req.body;
        const ExistingDoctor=await DoctorData.findOne({Username});
        if(ExistingDoctor){
            return req.status(400).json({message:'Existing Doctor availabel'});
        }
        const newDoc=new DoctorData({Username,Password,DoctorName,Description,Email,Phone,Gender});
        await newDoc.save();
        res.status(201).json({message:'New Doctor added successfully'});
    }catch(error){
        res.status(500).json({error:'Internal Server Error'});
    }
})

const port=5000;
app.listen(port , ()=>{
    console.log(`server is running in ${port}`)
})