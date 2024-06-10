import {connect} from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import {NextRequest , NextResponse} from 'next/server'
import bcryptjs from 'bcryptjs';
import { sendEmail } from './../../../../helpers/mailer';

connect();


export async function POST(request : NextRequest){
    try {
        const req = await request.json();
        const {username , email , password} = req;

        // validation
        console.log(req);

        const user = await User.findOne({email});

        if(user){
            return NextResponse.json({error : "User already exists login" , status : 500});
        }

        // hashing password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password , salt);

        const newUser = new User({
            username , email , password:hashedPassword
        })

        const savedUser = await newUser.save();

        console.log(savedUser);

        // send verification sendEmail
        await sendEmail({email , emailType: "VERIFY" , userId: savedUser._id})

        return NextResponse.json({message : "User registered successfully" , success : true , savedUser})


        
    } catch (error:any) {
        return NextResponse.json({
            error : error.message,
            status : 500
        })
    }
}