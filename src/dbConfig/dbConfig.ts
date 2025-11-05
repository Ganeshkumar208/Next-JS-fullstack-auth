import mongoose, { connection } from "mongoose";
import { connected } from "process";

const connect = () => {
    try {
        mongoose.connect(process.env.mongo_url!);
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log('MongoDb Connection Successfull')
        })
        connection.on('error', (err) => {
            console.log('MongoDb Connection UnSuccessfull', err)
            process.exit();
        })
    } catch (error) {
        console.log('Error Connecting the Db', error)
    }
}

export default connect