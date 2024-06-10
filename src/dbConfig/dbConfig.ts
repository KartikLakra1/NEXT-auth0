import mongoose from 'mongoose';

export async function connect(){
    try {
        mongoose.connect(process.env.MONGO_URL!);
        const conn = mongoose.connection

        conn.on('connected' , ()=>{
            console.log('MongoDB connected', conn);
            }
        )

        conn.on('error' , (err) => {
            console.log('Mongodb connection error , please check DB' + err);
            process.exit();
        })
    } catch (error) {
        console.log('Something went wrong in connecting to db')
        console.log(error);
    }
}