const express = require('express')

const {userController} = require("./routes/user.routes")
const {notesController} = require("./routes/notes.routes")
const { connection } = require('./config/db')

const app = express();

app.use(express.json())

const PORT = 8080;

app.get("/", (req,res)=> {
    res.send("Home Page");
})

app.use('/user', userController);

app.use('/notes', notesController); 

app.listen(PORT, async()=> {

    try{
        await connection;
        console.log("Connected to DB");
    }
    catch(err)
    {
        console.log("Error in connecting to DB");
        console.log(err);
    }
    console.log(`listening on PORT ${PORT}`);
})