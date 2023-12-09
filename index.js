import express from 'express'
import { router } from "./routes/route.js"
import mongoose from 'mongoose'

const app = express();
const port = 4000;

const uname = "newtask";
const upass = "chomchom";
const ulink = "newtask.g3pbhma.mongodb.net";
const uri = `mongodb+srv://${uname}:${upass}@${ulink}/?retryWrites=true&w=majority`;

app.use(express.json());

const connect_to_database = async() => {
    try{
        await mongoose.connect(uri);
        console.log("connected to mongodb");
    }catch(error){
        console.error("Error connecting to mongodb", error);
    }
}

connect_to_database();

app.use("/api", router);

app.listen(port, () => {
    console.log("port connected");
})