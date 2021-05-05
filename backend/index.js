import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv"

dotenv.config() //To load the enviroment variables
const MongoClient = mongodb.MongoClient
const port = process.env.PORT || 8000

MongoClient.connect(
    process.env.RESTREVIEWS_DB_URI, 
    {
        poolSize: 50, //Maximun people who can connect 
        wtimeout: 2500, //At 2.5 seconds the request will timeout
        useNewUrlParser: true
    }
    )
    .catch(err => {
        console.log(err);
        process.exit(1)
    })
    .then(async client => {
        app.listen(port, ()=>{
            console.log(`Listening on port ${port}`);
        })
    })